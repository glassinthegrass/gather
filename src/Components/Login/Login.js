import React, { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/userReducer";

const Login = (props) => {
const history = useHistory()
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [toggle, setToggle] = useState({
    nullToggle: true,
    loginToggle: false,
    registerToggle: false,
  });
  const {push}=history
const {isLoggedIn}=props.user
console.log(isLoggedIn)
useEffect(()=>{
    if(isLoggedIn){
        push('/')
    }
},[isLoggedIn,push])

  let loginWindow = (
      <section>
      <input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="text"
        placeholder="Enter email"
        />
      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="text"
        placeholder="Enter password"
        />
      <h1 onClick={()=>handleLogin()}>Submit</h1>
    </section>
  );
  
  
  let registerWindow = (
      <section id="registerBox">
      <input
        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="first name"
        />
      <input
        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="last name"
        />
      <input
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="email"
        />
      <input
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="password"
        />
      <input
        onChange={(e) =>
            setNewUser({ ...newUser, passwordTwo: e.target.value })
        }
        className="registerInput"
        type="text"
        placeholder="password"
        />
      <div>Submit</div>
    </section>
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
    <></>
  ) : toggle.loginToggle ? (
    loginWindow
  ) : toggle.registerToggle ? (
    registerWindow
  ) : (
    <></>
  );
  return (
    <section>
      <div id="loginBox">
        <div id="loginHeadline">
          <p>A place to...</p>
          <h1>Gather</h1>
          {windowToggle}
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { loginUser })(Login);
