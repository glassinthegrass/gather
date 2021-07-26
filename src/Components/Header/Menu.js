import React from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";

let MenuWindow = styled.aside`
min-width:20%;
min-height:100vh;
display:flex;
justify-content:center;
background-color:rgb(88,88,88);
`;
let LinkContainer = styled.div`
display:flex;
justify-content:space-around;
align-items:center;
flex-direction:column;
min-width:80%;
height:40%;
`


const Menu = (props) => {
  return (
  <MenuWindow>
    <LinkContainer>
        <Link to='/home'>Home</Link>
        <Link to='/groups'>Groups</Link>
        <Link to='/profile'>Profile</Link>
        <Link onClick={()=>props.logoutUser()} to='/'>Logout</Link>
        </LinkContainer>
  </MenuWindow>
  );
};

export default Menu