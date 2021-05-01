import Image from "next/image";
import { useEffect, useRef } from "react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { usePlayer } from "../../contexts/PlayerContext";
import { Buttons, Container, EmptyPlayer, Progress } from "./styles";

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

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
          <span>00:00</span>
          <div className="slider">
            { episode ? (
              <Slider 
                trackStyle={{ backgroundColor: "#04d361"}}
                railStyle={{ backgroundColor: "#9f75ff"}}
                handleStyle= {{ borderColor: "#04d361", borderWidth: 4}}
              />
            ) : (
              <div className="emptySlider" />
            )}
          </div>
          <span>00:00</span>
        </Progress>

        { episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            autoPlay
            loop={isLooping}
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
