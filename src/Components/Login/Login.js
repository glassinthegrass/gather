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
  const [loginError, setLoginError] = useState("");
  const [regError, setRegError] = useState("");
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
    setLoginError("");
    let user = { ...loginUser };
    user.email = email;
    setLoginUser(user);
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
  const handleLogin = () => {
    let emailReg = new RegExp(/^\S+@\S+\.\S+$/, "ig");
    const { email, password } = loginUser;
    if (!emailReg.test(loginUser.email)) {
      setLoginError("Email is not valid.");
    } else {
      axios
        .post("/auth/login", { email, password })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          setLoginError(err.response);
        });
    }
  };

  const handleLoginKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleRegister = () => {
    setRegError("");
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
        setRegError(err.response.data);
      });
  };
  const handleRegisterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  let loginWindow = (
    <>
      <Input
        onChange={(e) => handleLoginEmail(e.target.value)}
        placeholder="Enter email"
        value={loginUser.email}
      />
      <Input
        onChange={(e) => handleLoginPassword(e.target.value)}
        onKeyPress={(e) => {
          handleLoginKeyPress(e);
        }}
        value={loginUser.password}
        type="password"
        placeholder="Enter password"
      />
    {loginError&&<Error>{loginError}</Error>}

      <Submit onClick={() => handleLogin()}>Submit</Submit>
    </>
  );

  let registerWindow = (
    <>
      <Input
        onChange={(e) => {
          setNewUser({ ...newUser, username: e.target.value });
          setRegError("");
        }}
        className="registerInput"
        value={newUser.username}
        type="text"
        placeholder="Pick a username!"
      />
      <Input
        onChange={(e) => {
          setNewUser({ ...newUser, email: e.target.value });
          setRegError("");
        }}
        className="registerInput"
        value={newUser.email}
        type="text"
        placeholder="What's your email?"
      />
      <Input
        onChange={(e) => {
          setNewUser({ ...newUser, first_name: e.target.value });
          setRegError("");
        }}
        className="registerInput"
        type="text"
        placeholder="What's your first name?"
      />
      <Input
        onChange={(e) => {
          setNewUser({ ...newUser, last_name: e.target.value });
          setRegError("");
        }}
        className="registerInput"
        type="text"
        placeholder="What's your last name?"
      />
      <Input
        onChange={(e) => {
          setNewUser({ ...newUser, password: e.target.value });
          setRegError("");
        }}
        className="registerInput"
        type="password"
        placeholder="Enter a password"
      />
      <Input
        onChange={(e) => {
          setNewUser({ ...newUser, passwordTwo: e.target.value });
          setRegError("");
        }}
        onKeyPress={(e) => handleRegisterKeyPress(e)}
        className="registerInput"
        type="password"
        placeholder="Re-enter your password"
      />
      { regError&&<Error>{regError}</Error>}
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
    </Window>
  );
};

export default Login;
