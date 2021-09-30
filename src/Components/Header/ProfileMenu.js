import React from "react";
import { Image,Transformation } from "cloudinary-react";
import { Profile, ProfileLink } from "./styles";

const ProfileMenu = ({dark,url,push,publicId,handleDarkToggle,logout,user_id}) => {

  let toggleText = dark ? "Light Mode" : "Dark Mode";

  return (
    <Profile dark={dark} className="profileMenu">

      <ProfileLink  onClick={() => push(`/profile/${user_id}`)}>
        <>
          Profile
          <Image publicId={publicId}><Transformation width='35' height='35' crop='fill' gravity='auto'radius='max' fetch_format='png' /></Image>

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
