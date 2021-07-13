import React from "react";
import MainRoutes from "./Routes/MainRoutes";
import "./App.css";
import Header from "./Components/Header/Header";
import { HashRouter, BrowserRouter } from "react-router-dom";



const Router =
  process.env.NODE_ENV === "development" ? HashRouter : BrowserRouter;

const App = () => {
  return (
    <Router>
      <Header />
      {MainRoutes}
    </Router>
  );
};

export default App;
