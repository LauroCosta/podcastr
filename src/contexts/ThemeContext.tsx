import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import light from "../styles/themes/light";
import dark from "../styles/themes/dark";

type ThemeContextData = {
  toggleTheme: () => void;
  title: string;
}

export const  ThemeContext = createContext({} as ThemeContextData);

type ThemeContextProviderProps = {
  children: ReactNode;
}

export function ThemeContextProvider ({ children }: ThemeContextProviderProps) {

  const [theme, setTheme] = useState(light);

  function toggleTheme (){
    setTheme(theme.title === "light" ? dark : light);
  }

  const title = theme.title;
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{
        toggleTheme,
        title,
      }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext);
}