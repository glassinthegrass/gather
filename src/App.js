import React, { useEffect, useState, useContext } from "react";
import { userContext } from "./userContext";
import MainRoutes from "./Routes/MainRoutes";
import Header from "./Components/Header/Header";
import { useHistory } from "react-router-dom";
import ProfileIcons from "./Components/Header/ProfileIcons";
import ProfileMenu from "./Components/Header/ProfileMenu";
import "./reset.css";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { darkContext } from "./themeProvider";

const App = (props) => {
  const [user, setUser] = useContext(userContext);
  const [dark, setDark] = useContext(darkContext);
  const { picture_public_id, picture_version, isLoggedIn } = user;
  const [menuToggle, setMenuToggle] = useState(false);

  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
    let remember = JSON.parse(localStorage.getItem("user"));
    remember === null
      ? setUser({ isLoggedIn: false })
      : remember
      ? axios
          .post("/auth/session", { remember })
          .then((res) => setUser(remember))
      : setUser({ isLoggedIn: false });
  }, [setUser]);

  useEffect(() => {
    let systemDark = JSON.parse(localStorage.getItem("dark"));
    systemDark === null
      ? setDark(false)
      : systemDark
      ? setDark(true)
      : setDark(false);
  }, [setDark]);
  const push = useHistory().push;
  useEffect(() => {
    if (picture_version) {
      setProfilePicture(
        `https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,r_max,f_png/` +
          picture_version +
          "/" +
          picture_public_id
      );
    }
  }, [picture_version, picture_public_id]);

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };
  const handleDarkToggle = () => {
    setDark(!dark);
    localStorage.setItem("dark", !dark);
  };
  const logout = () => {
    let user = { isLoggedIn: false };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const bottomHeaderSwitch = isLoggedIn ? (
    <BottomHeader>
      <ProfileIcons
        user_id={user.user_id}
        profileMenu={
          <ProfileMenuMover>
            <ProfileMenu
              url={profilePicture}
              logout={logout}
              push={push}
              dark={dark}
              handleDarkToggle={handleDarkToggle}
              user_id={user.user_id}
            />
          </ProfileMenuMover>
        }
      />
    </BottomHeader>
  ) : (
    <></>
  );
  const mainView = (
    <>
      <Header
        profileMenu={
          <ProfileMenu
            url={profilePicture}
            logout={logout}
            push={push}
            dark={dark}
            handleDarkToggle={handleDarkToggle}
            user_id={user.user_id}
          />
        }
        profilePicture={profilePicture}
        logout={logout}
        handleDarkToggle={handleDarkToggle}
        push={push}
        handleMenuToggle={handleMenuToggle}
        user={user}
      />
      <MainHolder>{MainRoutes}</MainHolder>
      {bottomHeaderSwitch}
    </>
  );

  return (
    <div className="App">
      {mainView}
    </div>
  );
};

export default App;

let MainHolder = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

let ProfileMenuMover = styled.div`
  margin-top: -10.3rem;
`;
let BottomHeader = styled.header`
  position: sticky;
  bottom: 0;
  height: 2rem;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  z-index: 3;
  background-color: rgb(242, 145, 50);
  @media (min-width: 601px) {
    display: none;
  }
`;
