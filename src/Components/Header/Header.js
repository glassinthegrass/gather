import React from "react";

import logo from "../../Assets/BeeLogoFull.png";
import {
  StyledHeader,
  Gather,
  LogoContainer,
  HeaderSpacer,
  Hide,
  Logo,
  MiniGather,
  GatherHolder,
} from "./styles";
import ProfileIcons from "./ProfileIcons";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const push = useHistory().push;
  const { isLoggedIn, user_id } = props.user;

  let hideButtons = isLoggedIn ? (
    <Hide>
      <ProfileIcons profileMenu={props.profileMenu} user_id={user_id} />
    </Hide>
  ) : (
    <HeaderSpacer></HeaderSpacer>
  );
  return (
    <StyledHeader>
      <LogoContainer>
        <Logo src={logo} alt="" />
        <GatherHolder
          onClick={() => {
            push("/home");
          }}
        >
          <MiniGather className="miniGather">Gather</MiniGather>
        </GatherHolder>
        <Gather>Gather</Gather>
      </LogoContainer>
      <HeaderSpacer></HeaderSpacer>
      <HeaderSpacer></HeaderSpacer>
      <HeaderSpacer></HeaderSpacer>

      {hideButtons}
    </StyledHeader>
  );
};

export default Header;
