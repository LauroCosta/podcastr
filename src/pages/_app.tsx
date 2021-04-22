import { GlobalStyle } from  '../styles/global';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { AppWrapper } from '../styles/app';

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <main>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />

      </main>
      <Player />
    </AppWrapper>
  )
}

export default MyApp
