import React from "react";
import {Link,useHistory} from 'react-router-dom'
const Header = () => {
const history=useHistory()

  return <div>
    <h1 onClick={()=>history.go(-1)}> {'<'} </h1>
      <Link to='/login'>
      <p>Login</p>
      </Link>
      <h1 onClick={()=>history.go(1)}>{'>'}</h1>
  </div>;

};
export default Header;
