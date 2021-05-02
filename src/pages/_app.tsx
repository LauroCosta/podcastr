import { GlobalStyle } from "../styles/global";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { AppWrapper } from "../styles/app";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import { ThemeContextProvider } from "../contexts/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
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
    </ThemeContextProvider>
  );
}
export default MyApp;
