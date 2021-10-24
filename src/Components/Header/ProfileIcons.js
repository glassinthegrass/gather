import React from "react";
import { Link } from "react-router-dom";
import Profile from "../../Public/Profile.png";
import home from "../../Public/home.png";
import people from "../../Public/people.png";
import groups from "../../Public/groups.png";
import { HeaderIcons, Holding, ProfileMenuBox } from "./styles";
const ProfileIcons = (props) => {
  const { user_id, profileMenu } = props;
  return (
    <>
      <Link to={`/home`}>
        <HeaderIcons src={home} alt="" />
      </Link>
      <Link to={`/groups`}>
        <HeaderIcons src={groups} alt="" />
      </Link>
      <Link to={`/people`}>
        <HeaderIcons src={people} alt="" />
      </Link>
      <Holding>
        <Link to={`/profile/${user_id}`}>
          <HeaderIcons src={Profile} alt="" />
        </Link>
        <ProfileMenuBox>{profileMenu}</ProfileMenuBox>
      </Holding>
    </>
  );
};
export default ProfileIcons;
