import React from "react";
import MainRoutes from "./Routes/MainRoutes";
import "./reset.css"
import "./App.css";
import Header from "./Components/Header/Header";


const App = () => {
  return (
<div>
      <Header />
      {MainRoutes}
      </div>
  );
};

export default App;
