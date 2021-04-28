import { GlobalStyle } from  '../styles/global';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { AppWrapper } from '../styles/app';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider 
      value={{ 
        episodeList, 
        currentEpisodeIndex, 
        play, 
        isPlaying,
        togglePlay,
        setPlayingState
      }}
    >
      <GlobalStyle />
      <AppWrapper>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </AppWrapper>
    </PlayerContext.Provider>
  )
}

export default MyApp
