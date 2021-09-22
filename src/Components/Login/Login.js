import React, { useEffect, useContext, useState } from "react";
import { userContext } from "../../userContext";
import { useHistory } from "react-router-dom";
import bee from "../../Assets/Gather_Line_with_Bee.png";

import {
  ToggleBox,
  Window,
  Box,
  Input,
  Submit,
  LoginToggle,
  RegisterToggle,
  Bee,
  Title,
  Error,
} from "./styles.js";
import axios from "axios";

const Login = (props) => {
  const [user, setUser] = useContext(userContext);
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordTwo: "",
    first_name: "",
    last_name: "",
  });
  const [toggle, setToggle] = useState({
    nullToggle: true,
    loginToggle: false,
    registerToggle: false,
  });
  const [emailError, setEmailError] = useState("");
  const history = useHistory();
  const { push } = history;
  const { isLoggedIn } = user;

  useEffect(() => {
    if (isLoggedIn === true) {
      push("/home");
    } else {
      push("/");
    }
  }, [isLoggedIn, push]);
  const handleLoginEmail = (email) => {
    setEmailError("");
    setLoginUser({ ...loginUser, email: email });
  };
  const handleLogin = () => {
    let emailReg = new RegExp(/^\S+@\S+\.\S+$/, "ig");
    if (emailReg.test(loginUser.email)) {
      const { email, password } = loginUser;
      axios
        .post("/auth/login", { email, password })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setEmailError("Email is not valid");
    }
  };

  const handleLoginPassword = (password) => {
    let newPassword = "";
    for (let i = 0; i < password.length; i++) {
      if (password[i] !== " ") {
        newPassword += password[i];
      }
    }
    setLoginUser({ ...loginUser, password: newPassword });
  };
  const handleLoginKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleRegisterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };
  const handleRegister = () => {
    const { first_name, last_name, username, email, password } = newUser;
    axios
      .post("/auth/register", {
        first_name,
        last_name,
        username,
        email,
        password,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        return console.log(err);
      });
    props.registerUser();
  };

  let loginWindow = (
    <>
      <Error>{emailError}</Error>
      <Input
        onChange={(e) => handleLoginEmail(e.target.value)}
        placeholder="Enter email"
      />
      <Input
        onChange={(e) => handleLoginPassword(e.target.value)}
        onKeyPress={(e) => {
          handleLoginKeyPress(e);
        }}
        type="password"
        placeholder="Enter password"
      />

      <Submit onClick={() => handleLogin()}>Submit</Submit>
    </>
  );

  let registerWindow = (
    <>
      <Input
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="Pick a username!"
      />
      <Input
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        className="registerInput"
        type="text"
        placeholder="What's your email?"
      />
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
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="registerInput"
        type="password"
        placeholder="Enter a password"
      />
      <Input
        onChange={(e) =>
          setNewUser({ ...newUser, passwordTwo: e.target.value })
        }
        onKeyPress={(e) => handleRegisterKeyPress(e)}
        className="registerInput"
        type="password"
        placeholder="Please verify your password"
      />

      {user.isRegistered ? (
        <Submit onClick={() => push("/profile/uploads")}>Next</Submit>
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
        <Bee src={bee} alt="" />
        <Box>
          <Title>Gather</Title>
          {windowToggle}
        </Box>
        <ToggleBox>
          <LoginToggle onClick={handleLoginClick}>Login</LoginToggle>
          <RegisterToggle onClick={handleRegisterClick}>
            Register
          </RegisterToggle>
        </ToggleBox>
      </div>
      {console.log(user)}
    </Window>
  );
};

export default Login;