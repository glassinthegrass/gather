import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import ThemeContextProvider from "./Context/themeProvider";
import UserContextProvider from "./Context/userContext";
const customHistory = createBrowserHistory();
const Router =
  process.env.NODE_ENV === "development" ? HashRouter : BrowserRouter;
const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <Router history={customHistory}>
          <App />
        </Router>
      </UserContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
