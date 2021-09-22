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

const App = (props) => {
  const [user,setUser] = useContext(userContext)
  const {  logoutUser } = props;
  const { picture_public_id, picture_version, isLoggedIn } = user;
  const [menuToggle, setMenuToggle] = useState(false);
  const [darkToggle, setDarkToggle] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

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
    setDarkToggle(!darkToggle);
  };

  const bottomHeaderSwitch = isLoggedIn ? (
    <BottomHeader>
      <ProfileIcons
        user_id={user.user_id}
        profileMenu={
          <ProfileMenuMover>
            <ProfileMenu
              url={profilePicture}
              logout={()=>setUser({isLoggedIn:false})}
              push={push}
              darkToggle={darkToggle}
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
            logout={()=>setUser({isLoggedIn:false})}
            push={push}
            darkToggle={darkToggle}
            handleDarkToggle={handleDarkToggle}
            user_id={user.user_id}
          />
        }
        profilePicture={profilePicture}
        logout={logoutUser}
        darkToggle={darkToggle}
        handleDarkToggle={handleDarkToggle}
        push={push}
        handleMenuToggle={handleMenuToggle}
        user={user}
      />
      <MainHolder>{MainRoutes}</MainHolder>
      {bottomHeaderSwitch}
    </>
  );

  const darkMode = darkToggle ? <DarkMode>{mainView}</DarkMode> : mainView;

  return <div className="App">{darkMode}</div>;
};

export default App

let MainHolder = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
let DarkMode = styled.div`
  background-color: rgb(88, 88, 88, 0.7);
  z-index: 0;
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
