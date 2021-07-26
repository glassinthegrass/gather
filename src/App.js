import React, {  useState } from "react";
import MainRoutes from "./Routes/MainRoutes";
import Menu from "./Components/Header/Menu";
import "./reset.css"
import "./App.css";
import {connect} from 'react-redux'
import { logoutUser,getUser } from "./redux/userReducer";
import Header from "./Components/Header/Header";
import styled from 'styled-components'


let MainHolder = styled.div`
display:flex;
justify-content:center;
flex-direction:row;
`


const App = (props) => {
  const {user,logoutUser}=props

  const [menuToggle,setMenuToggle]=useState(false)

const handleMenuToggle =()=>{
  setMenuToggle(!menuToggle)
}

const menuSwitch= menuToggle ? <Menu logoutUser={logoutUser}/>:<></>

  
  return (
<div className='App'>
      <Header handleMenuToggle={handleMenuToggle} user={user} />
  <MainHolder>
      {MainRoutes}
      {menuSwitch}
      </MainHolder>
      </div>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps,{logoutUser,getUser})(App);