import React from "react";
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = (styled.header`
display:flex;
justify-content:flex-end;
height: 5rem;
width:100vw;
background-color:rgb(252, 142, 52, 0.792)
`)

const Header = () => {
const history=useHistory()  

return( 
<StyledHeader>
    
      <Link to='/login'>
      <p>Login</p>
      </Link>


      <h1 onClick={()=>history.go(-1)}> {'<'} </h1>
      <h1 onClick={()=>history.go(1)}>{'>'}</h1>
  </StyledHeader>
)
};
export default Header;
