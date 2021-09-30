import React, { useState, createContext } from "react";
import { ThemeProvider } from "styled-components";

export const darkContext = createContext();

const ThemeContextProvider = (props) => {
  const [dark, setDark] = useState(false);

  const darkTheme = {
    dark:dark,
    backgroundColor: "background-color:rgb(88,88,88,0.5)",
    solidBackgroundColor:'background-color:rgb(88,88,88)',
    color: "color:white",
    postFontWeight: `font-weight:600`,
    fontShadow: `text-shadow: -1.5px -1.5px 0 rgb(88,88,88), 1.5px -1.5px 0 rgb(88,88,88),
    -1.5px 1.5px 0 rgb(88,88,88), 1px 1px 0 rgb(88,88,88)`,
  };
  const lightTheme = {
    dark:dark,
    color: "color:rgb(88,88,88)",
    backgroundColor: "background-color: rgb(252, 219, 166)",
    postFontWeight: "font-weight:400",
    fontShadow:'',
  };
  const theme = dark ? darkTheme : lightTheme;

  return (
    <darkContext.Provider value={[dark, setDark]}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </darkContext.Provider>
  );
};
export default ThemeContextProvider;
