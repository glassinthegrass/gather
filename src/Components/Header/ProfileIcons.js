import React from 'react';
import { Link } from 'react-router-dom';
import Profile from "../../Assets/Profile.png";
import home from "../../Assets/home.png";
import people from "../../Assets/people.png";
import groups from "../../Assets/groups.png";
import { HeaderIcons,Holding } from './styles';
const ProfileIcons =(props)=>{
    const {user_id,profileMenu}=props
    return<>
    <Link to={`/home`}>
    <HeaderIcons src={home} alt="" />
    </Link>
    <Link to={`/all-groups`}>
    <HeaderIcons src={groups} alt="" />
    </Link>
    <Link to={`/people`}>
    <HeaderIcons src={people} alt="" />
    </Link>
    <Holding>
    <Link to={`/profile/${user_id}`}>
      <HeaderIcons src={Profile} alt="" />
    </Link>
{profileMenu}
    </Holding>
    </>
}
export default ProfileIcons