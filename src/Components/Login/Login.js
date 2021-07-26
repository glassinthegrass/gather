import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../../redux/userReducer.js";
import {
  ToggleBox,
  Window,
  Box,
  Input,
  Submit,
  LoginToggle,
  RegisterToggle
} from "./styles.js";


const Login = (props) => {
  const [loginUser, setLoginUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [toggle, setToggle] = useState({
    nullToggle: true,
    loginToggle: false,
    registerToggle: false,
  });
  const history = useHistory();
  const { push } = history;
  const { user } = props;
  const { isLoggedIn } = user;
  const { pathname } = props.history.location.pathname;


  useEffect(() => {
    if (isLoggedIn && pathname !== "/") {
      push("/home");
    }
  }, [isLoggedIn, pathname, push]);

  const handleLogin = () => {
    props.loginUser(loginUser.email, loginUser.password);
  };
  const handleRegister = () => {
    props.registerUser(
      newUser.first_name,
      newUser.last_name,
      newUser.email,
      newUser.password
    );
  };

  let loginWindow = (
    <>
      <Input
        onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
        type="text"
        placeholder="Enter email"
      />
      <Input
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
        type="text"
        placeholder="Enter password"
      />
      <Submit onClick={() => handleLogin()}>Submit</Submit>
    </>
  );

  let registerWindow = (
    <>
      <Input
        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="What's your first name?"
      />
      <Input
        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="What's your last name?"
      />
      <Input
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="Tell me your email"
      />
      <Input
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="Enter a password"
      />
      <Input
        onChange={(e) =>
          setNewUser({ ...newUser, passwordTwo: e.target.value })
        }
        className="registerInput"
        type="text"
        placeholder="Please verify your password"
      />
      {props.user.isRegistered ? (
        <Link to="/uploads/profile">Next</Link>
      ) : (
        <Submit onClick={() => handleRegister()}>Submit</Submit>
      )}
    </>
  );

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
    <Window>
      <div>
        <p>A place for friends to...</p>
        <Box>
          <h1>Gather</h1>
          {windowToggle}
        </Box>
        <ToggleBox>
          <LoginToggle onClick={handleLoginClick}>Login</LoginToggle>
          <RegisterToggle onClick={handleRegisterClick}>
            Register
          </RegisterToggle>
        </ToggleBox>
      </div>

    </Window>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { loginUser, registerUser })(Login);
