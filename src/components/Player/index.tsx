import { Container, EmptyPlayer } from './styles';

export function Player() {
  return (
    <Container>

      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      <EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </EmptyPlayer>

      <footer>
        
      </footer>

    </Container>
  )
}