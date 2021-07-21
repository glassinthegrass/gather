import React from "react";
import MainRoutes from "./Routes/MainRoutes";
import "./reset.css"
import "./App.css";
import {connect} from 'react-redux'
import { logoutUser } from "./redux/userReducer";
import Header from "./Components/Header/Header";


const App = (props) => {
  return (
<div className='App'>
      <Header user={props.user} logoutUser={props.logoutUser}/>
      {MainRoutes}
      </div>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps,{logoutUser})(App);