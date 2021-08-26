import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Profile from "../../Assets/Profile.png";
import home from "../../Assets/home.png";
import people from "../../Assets/people.png";
import groups from "../../Assets/groups.png";
import ProfileMenu from "./ProfileMenu";
import logo from '../../Assets/BeeLogoFull.png'
import {
  HeaderMenuIcon,
  StyledHeader,
Gather,
LogoContainer,
  HeaderSpacer,
Hide,
  Logo,
  HardSpace
} from "./styles";
import ProfileIcons from "./ProfileIcons";

const Header = (props) => {
  const [style, setStyle] = useState("flex-end");
  const [profilePicture, setProfilePicture] = useState("");

  const {
    isLoggedIn,
    user_id,
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

let hideButtons = isLoggedIn ?  (<Hide><ProfileIcons profileMenu={props.profileMenu} user_id={user_id} /></Hide>):(<HeaderSpacer></HeaderSpacer>);
  return (
    <StyledHeader>

<LogoContainer>
      <Logo src={logo} alt=''/>
<Gather>Gather</Gather>
</LogoContainer>
      <HeaderSpacer></HeaderSpacer>
      <HeaderSpacer></HeaderSpacer>
      <HeaderSpacer></HeaderSpacer>
      {hideButtons}

      <HeaderMenuIcon
        src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png"
        alt={"menu"}
        onClick={() => props.handleMenuToggle()}
      />
    </StyledHeader>
  );
};

export default Header;
