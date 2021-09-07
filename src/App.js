import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import MainRoutes from "./Routes/MainRoutes";
import { connect } from "react-redux";
import { logoutUser, getUser } from "./redux/userReducer";
import Header from "./Components/Header/Header";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ProfileIcons from "./Components/Header/ProfileIcons";
import ProfileMenu from "./Components/Header/ProfileMenu";

const App = (props) => {
  const { user, logoutUser } = props;
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
              logout={props.logoutUser}
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
            logout={props.logoutUser}
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

  return <AppBox className="App">{darkMode}</AppBox>;
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { logoutUser, getUser })(App);
let AppBox = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
font-family: Nunito, Roboto,  sans-serif;
background: url('./Assets/Gather_honeycombs.png') no-repeat center center fixed;
background-size:cover;
text-align: center;
display:flex;
flex-direction: column;
min-height:100vh;
width:100vw;
z-index:0
`
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
