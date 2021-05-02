import "styled-components";

declare module 'styled-components'{
  export interface DefaultTheme {
    title: string,
  
    colors: {
      background: string,
      primary: string,
      secundary: string,
      primaryText: string,
      secundaryText: string,
      border: string,
      dashedPlayer: string,
      primaryPlayer: string,
      secundaryPlayer: string,
      backgroundButton: string,
    },

  }
}