import { GlobalStyle } from  '../styles/global';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { AppWrapper } from '../styles/app';
import { PlayerContextProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <AppWrapper>
        <GlobalStyle />
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </AppWrapper>
    </PlayerContextProvider>
  )
}
export default MyApp
