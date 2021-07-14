import React, { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/userReducer";
import axios from 'axios'
import styled from 'styled-components'

const Window=styled.div`
display:flex;
justify-content:space-around;
align-items:center;
align-content:center;
width:100%;
height:100%;

`
const Box= styled.div`
display:flex;
padding:3rem;
width:50%;
height:50%;
margin:15%;
justify-content:center;
align-items:center;
flex-direction:column;
border:1px dotted rgb(88,88,88)
`
const Input = styled.input`
width:8rem;
height:1rem;
display:flex;
justify-content:center;
flex-direction:column;
padding:1vh;
margin:1rem;
`
const Submit=styled.h1`
width:6rem;
height:1rem;
display:flex;
justify-content:center;
flex-direction:column;
padding:1vh;
margin:1rem;
align-items:center;
box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
border: 3px solid rgb(88,88,88);
&:hover{
background-color:blue;
}
`
const Toggle=styled(Submit)`
width:3rem;
height:0.5rem;
font-size:8px;
background-color:white;
`
const Login = (props) => {
const history = useHistory()
  const [user, setUser] = useState("");
  const[announcements,setAnnouncements]=useState('')
  const [newUser, setNewUser] = useState("");
  const [toggle, setToggle] = useState({
    nullToggle: true,
    loginToggle: false,
    registerToggle: false,
  });
  const {push}=history;
  
  const{isLoggedIn,user_id}=props.user
  useEffect(()=>{
    if(isLoggedIn){
      axios.get(`/api/announcements/${user_id}`).then(res=>setAnnouncements(res.data)).catch(err=>console.log(err))
    }
  },[isLoggedIn,user_id,setAnnouncements,push])
useEffect(()=>{
if(announcements){
  push({pathname:'/home',
state:{announcements}})
}
},[announcements,push])
let loginWindow = (
  <>
      <Input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="text"
        placeholder="Enter email"
        />
      <Input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="text"
        placeholder="Enter password"
        />
      <Submit onClick={()=>handleLogin()}>Submit</Submit>
    </>
  );
  
  
  let registerWindow = (
    <div id="registerBox">
      <Input
        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="first name"
        />
      <Input
        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="last name"
        />
      <Input
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="email"
        />
      <Input
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="password"
        />
      <Input
        onChange={(e) =>
          setNewUser({ ...newUser, passwordTwo: e.target.value })
        }
        className="registerInput"
        type="text"
        placeholder="password"
        />
      <Submit>Submit</Submit>
    </div>
  );
  
  const handleLogin = () => {
    props.loginUser(user.email, user.password);
  };
  
  const handleLoginClick = () => {
    if (toggle.nullToggle || toggle.registerToggle) {
      setToggle({
        ...toggle,
        nullToggle: false,
        loginToggle: true,
        registerToggle: false,
      });
    } else {
      setToggle({
        ...toggle,
        registerToggle: false,
        loginToggle: false,
        nullToggle: true,
      });
    }
  };
  const handleRegisterClick = () => {
    if (toggle.nullToggle || toggle.loginToggle) {
      setToggle({
        ...toggle,
        registerToggle: true,
        loginToggle: false,
        nullToggle: false,
      });
    } else {
      setToggle({
        ...toggle,
        registerToggle: false,
        loginToggle: false,
        nullToggle: true,
      });
    }
  };
  const windowToggle = toggle.nullToggle ? (
    <>
    <p>A place for friends to...</p>
    <h1>GATHER</h1>
    </>
  ) : toggle.loginToggle ? (
    loginWindow
    ) : toggle.registerToggle ? (
      registerWindow
      ) : (
        <></>
        );
        

return (
  
<Window>
  <Box>
    {windowToggle}
  <Toggle onClick={handleLoginClick}>Login</Toggle>
  <Toggle onClick={handleRegisterClick}>Register</Toggle>
  </Box>
{console.log(announcements)}
  </Window>


  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { loginUser })(Login);
