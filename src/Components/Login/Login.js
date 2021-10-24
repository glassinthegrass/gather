//modules
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
//state management
import { userContext } from "../../Context/userContext";
//styles
import { LoginWindow } from "./LoginWindow";
import { RegsiterWindow } from "./RegisterWindow";
import bee from "../../Public/Gather_Line_with_Bee.png";
import {
  ToggleBox,
  Window,
  Box,
  LoginToggle,
  RegisterToggle,
  Bee,
  Title,
} from "./styles.js";

const Login = (props) => {
  //loggedInUser
  const [user, setUser] = useContext(userContext),
    { isLoggedIn } = user;
  //loginState
  const [loginUser, setLoginUser] = useState({ email: "", password: "" }),
    //register state
    [newUser, setNewUser] = useState({
      username: "",
      email: "",
      password: "",
      passwordTwo: "",
      first_name: "",
      last_name: "",
    }),
    //window toggle state
    [toggle, setToggle] = useState({
      nullToggle: true,
      loginToggle: false,
      registerToggle: false,
    }),
    //destructure toggle
    { nullToggle, loginToggle, registerToggle } = toggle,
    //errors
    [loginError, setLoginError] = useState(""),
    [regError, setRegError] = useState(""),
    //localstorage keep login state
    [remember, setRemember] = useState(false),
    push = useHistory().push;

  //redirect
  useEffect(() => {
    if (isLoggedIn === true) {
      push("/home");
    } else {
      push("/");
    }
  }, [isLoggedIn, push]);

  //handler object
  const handle = {
    
    loginEmail: (email) => {
      setLoginError("");
      let user = { ...loginUser };
      user.email=email
      setLoginUser(user);
    },
    loginPassword: (password) => {
      //remove spaces
      let newPassword = "";
      for (let i = 0; i < password.length; i++) {
        if (password[i] !== " ") {
          newPassword += password[i];
        }
      }
      setLoginUser({ ...loginUser, password: newPassword });
    },
    login: () => {      
      const { email, password } = loginUser;
      //email regex
      let emailReg = new RegExp(/^\S+@\S+\.\S+$/, "ig");
      if (!emailReg.test(loginUser.email)) {
        //if emailReg doesn't return true throw error
        setLoginError("Email is not valid.");
      } else {
        //login functionality with stay logged in info
        axios
          .post("/auth/login", { email, password })
          .then((res) => {
            //old refers to the user local storage pulled on app.js
            //and stored in userContext
            let old = user;
            setUser(res.data);
            remember
              ? localStorage.setItem("user", JSON.stringify(res.data))
              : localStorage.setItem("user", JSON.stringify(old));
          })
          .catch((err) => {
            //specific errors can be seen in the controller file
            setLoginError(err.response.data);
          });
      }
    },
    loginKeyPress: (e) => {
      //listens for enter keypress to submit login info
      //only on password input
      if (e.key === "Enter") {
        handle.login();
      }
    },
    register: () => {
      //handle register functionality
      setRegError("");
      //destructure newUser
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
        //establish item on local storage for darkmode
      localStorage.setItem("dark", false);
    },
    registerKeyPress: (e) => {
      //listen for keypress enter on password 1/2 inputs
      if (e.key === "Enter") {
        handle.register();
      }
    },
    loginClick: () => {
      //open loginwindow close register and title window
      if (nullToggle || registerToggle) {
        setToggle({
          ...toggle,
          nullToggle: false,
          loginToggle: true,
          registerToggle: false,
        });
      } else {

        //does oposite of above
        setToggle({
          ...toggle,
          registerToggle: false,
          loginToggle: false,
          nullToggle: true,
        });
      }
    },

    registerClick: () => {
      //opens register window closes login and landing window
      if (nullToggle || loginToggle) {
        setToggle({
          ...toggle,
          registerToggle: true,
          loginToggle: false,
          nullToggle: false,
        });
      } else {
        //does opposite
        setToggle({
          ...toggle,
          registerToggle: false,
          loginToggle: false,
          nullToggle: true,
        });
      }
    },
    remember: () => {
      setRemember(!remember);
    },
    newUser: (e) => {
      setNewUser(e);
      setRegError("");
    },
  };

  const windowDisplayToggle = nullToggle ? (
    <React.Fragment></React.Fragment>
  ) : loginToggle ? (
    <LoginWindow
      handle={handle}
      remember={remember}
      loginError={loginError}
      loginUser={loginUser}
    />
  ) : registerToggle ? (
    <RegsiterWindow
      push={push}
      handle={handle}
      user={user}
      regError={regError}
      newUser={newUser}
    />
  ) : (
    <React.Fragment></React.Fragment>
  );

  let display = (
    <span>
      <p>A place for friends to...</p>
      <Bee src={bee} alt="" />
      <Box>
        <Title>Gather</Title>
        {windowDisplayToggle}
      </Box>
      <ToggleBox>
        <LoginToggle onClick={handle.loginClick}>Login</LoginToggle>
        <RegisterToggle
          loginToggle={loginToggle}
          onClick={handle.registerClick}
        >
          Register
        </RegisterToggle>
      </ToggleBox>
    </span>
  );

  return <Window>{display}</Window>;
};

export default Login;
