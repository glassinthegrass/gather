import React from 'react'
import {Profile,ProfileLink,ProfilePic} from './styles'

const ProfileMenu =(props)=>{
    let toggleText =  props.darkToggle ? 'Light Mode':'Dark Mode';
 
    return  <Profile className='profileMenu'>

    <ProfileLink onClick={()=>props.push(`/profile/${props.user_id}`)}>
<>Profile<ProfilePic src={props.url} alt=''/></>
    </ProfileLink>


    <ProfileLink onClick={()=>props.handleDarkToggle()}>
      {toggleText}
    </ProfileLink>

    <ProfileLink onClick={()=>props.logout()}>
      Logout
    </ProfileLink>
  </Profile>
}
export default ProfileMenu