import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../../Assets/Profile.png";
import home from "../../Assets/home.png";
import people from "../../Assets/people.png";
import groups from "../../Assets/groups.png";
import {
  HeaderMenuIcon,
  HeaderIcons,
  StyledHeader,

  Greeting,
  HeaderSpacer,
  GreetingContainer,
} from "./styles";
const Header = (props) => {
  const [style, setStyle] = useState("flex-end");
  const [profilePicture, setProfilePicture] = useState("");
  const {
    isLoggedIn,
    user_id,
    first_name,
    profile_picture_url,
    picture_public_id,
    picture_version,
  } = props.user;

  useEffect(() => {
    isLoggedIn ? setStyle("space-between") : setStyle("flex-end");
  }, [isLoggedIn, style]);

  useEffect(() => {
    setProfilePicture(
      `https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,r_max,f_png/` +
        picture_version +
        "/" +
        picture_public_id
    );
  }, [picture_version, picture_public_id]);

  const greeting = props.user.isLoggedIn ? (
    <GreetingContainer>
      <Link to={`/profile/${user_id}`}>
        <img src={profilePicture} alt={profile_picture_url} />
      </Link>
      <Greeting>{`Hi ${first_name}!`}</Greeting>
    </GreetingContainer>
  ) : (
    <Greeting>Login!</Greeting>
  );
  return (
    <StyledHeader>
      {greeting}
      <HeaderSpacer></HeaderSpacer>
      <HeaderSpacer></HeaderSpacer>
      <HeaderSpacer></HeaderSpacer>
      <Link to={`/home`}>
        <HeaderIcons src={home} alt="" />
      </Link>
      <Link to={`/all-groups`}>
        <HeaderIcons src={groups} alt="" />
      </Link>
      <Link to={`/people`}>
        <HeaderIcons src={people} alt="" />
      </Link>
      <Link to={`/profile/${user_id}`}>
        <HeaderIcons src={Profile} alt="" />
      </Link>

      <HeaderMenuIcon
        src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png"
        alt={"menu"}
        onClick={() => props.handleMenuToggle()}
      />
    </StyledHeader>
  );
};

export default Header;
