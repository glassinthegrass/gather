import React from "react";
import { Profile, ProfileLink, ProfilePic } from "./styles";

const ProfileMenu = ({dark,url,push,handleDarkToggle,logout,user_id}) => {

  let toggleText = dark ? "Light Mode" : "Dark Mode";

  return (
    <Profile dark={dark} className="profileMenu">

      <ProfileLink  onClick={() => push(`/profile/${user_id}`)}>
        <>
          Profile
          <ProfilePic src={url} alt="" />
        </>
      </ProfileLink>

      <ProfileLink dark={dark} onClick={() => handleDarkToggle()}>
        {toggleText}
      </ProfileLink>

      <ProfileLink onClick={() => logout()}>Logout</ProfileLink>
    </Profile>
  );
};
export default ProfileMenu;
