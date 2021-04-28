import { GlobalStyle } from  '../styles/global';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { AppWrapper } from '../styles/app';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play}}>
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
