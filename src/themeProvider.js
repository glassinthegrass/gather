import React, { useState, createContext } from "react";
import { ThemeProvider } from "styled-components";

export const darkContext = createContext();

const ThemeContextProvider = (props) => {
  const [dark, setDark] = useState(false);

  const darkTheme={
    'background-color':'rgb(88,88,88,0.5)',
    }
    const lightTheme={

    }
const theme = dark?darkTheme:lightTheme;

  return (
    <darkContext.Provider value={[dark, setDark]}>
      <ThemeProvider theme={theme}>
          {props.children}
      </ThemeProvider>
    </darkContext.Provider>
  );
};
export default ThemeContextProvider;
