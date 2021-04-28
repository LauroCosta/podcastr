import Image from "next/image";
import { useContext } from "react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { PlayerContext } from "../../contexts/PlayerContext";
import { Buttons, Container, EmptyPlayer, Progress } from "./styles";

export function Player() {
  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);

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

        <Buttons>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className="playButton" disabled={!episode}>
            <img src="/play.svg" alt="Tocar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próximo" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </Buttons>
      </footer>
    </Container>
  );
}
