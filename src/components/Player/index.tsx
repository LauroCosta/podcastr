import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { usePlayer } from "../../contexts/PlayerContext";
import { Buttons, Container, EmptyPlayer, Progress } from "./styles";
import { converDurationToTimeString } from "../../utils/convertDurationToTimeString";

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    isLooping,
    isShuffling,
    playNext,
    playPrevious,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    hasNext,
    hasPrevious,
    clearPlayerState,
  } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleOnEnded(){
    if(hasNext){
      playNext();
    } else {
      clearPlayerState();
      setProgress(0);
    }
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <Container>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className="currentEpisode">
          <Image 
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}

      <footer className={!episode ? "empty" : ""}>
        <Progress>
          <span>{converDurationToTimeString(progress)}</span>
          <div className="slider">
            { episode ? (
              <Slider 
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: "#04d361"}}
                railStyle={{ backgroundColor: "#9f75ff"}}
                handleStyle= {{ borderColor: "#04d361", borderWidth: 4}}
              />
            ) : (
              <div className="emptySlider" />
            )}
          </div>
          <span>{converDurationToTimeString(episode?.duration ?? 0)}</span>
        </Progress>

        { episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            autoPlay
            onEnded={handleOnEnded}
            loop={isLooping}
            onLoadedMetadata={() => setupProgressListener()}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}  
          />
          
        )}
        <Buttons>
          <button 
            type="button" 
            onClick={toggleShuffle} 
            disabled={!episode || episodeList.length === 1}
            className={isShuffling ? "isActive" : ""}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button 
            type="button" 
            className="playButton" 
            disabled={!episode}
            onClick={togglePlay}
          >
            { isPlaying 
              ? <img src="/pause.svg" alt="Pausar"/> 
              : <img src="/play.svg" alt="Tocar"/>
            }
          </button>
          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="Tocar próximo" />
          </button>
          <button 
            type="button" 
            onClick={toggleLoop} 
            disabled={!episode}
            className={isLooping ? "isActive" : ""}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </Buttons>
      </footer>
    </Container>
  );
}
