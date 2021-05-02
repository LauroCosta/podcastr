import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Switch from "react-switch";
import Link from 'next/link'; 
import { Container } from '../Header/styles';
import { useTheme } from '../../contexts/ThemeContext';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM',{
    locale: ptBR,
  });

  const { title, toggleTheme} = useTheme();

  return (
    <Container>
      <Link href="/">
       <a><img src="/logo.svg" alt="Podcastr"/></a>
      </Link>

      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>

      <Switch 
        onChange={toggleTheme}
        checked={title === "dark"}
        checkedIcon={false}
        uncheckedIcon={false}
        height={25}
        width={50}
        handleDiameter={20}
        offColor= "#8464E6"
        onColor= "#202225"

      />
    </Container>
  )
}