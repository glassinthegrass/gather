import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserPosts from "./UserPosts";
import UserProfile from "./UserProfile";


let Container = styled.section`
  width: 100vw;
min-height:90vh;
display:flex;
flex-direction:column;
align-items:flex-end;


`;
let Spacer= styled.div`
width:100vw;
height:2rem;
`
let ProfileContainer = styled.div`
display:flex;
flex-direction:column;

`

const Profile = (props) => {
    console.log(props)
  const { isLoggedIn } = props.user;
  const history = useHistory(),
    { push } = history;
  const { user_id } = props.match.params;
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState('');
  const [profilePicture, setProfilePicture] = useState("");

useEffect(()=>{
    if(isLoggedIn===false){
        push('/')
    } 
})


  useEffect(() => {
    axios
    .get(`/api/profile/${user_id}`)
    .then((res) => {
      setUser(res.data[0]);
      setPosts(res.data[1]);
    })
    .catch((err) => console.log(err));
  }, [user_id]);

  const {picture_public_id, picture_version} = user;

  useEffect(() => {
    if(picture_public_id){
      setProfilePicture(
        `https://res.cloudinary.com/glassinthegrass/image/upload/w_200,h_250,g_auto,c_fill,r_5,f_png/` +
        picture_version +
        "/" +
        picture_public_id
        );
      };
      }, [picture_version, picture_public_id]);

  let profile = isLoggedIn ? (<ProfileContainer><UserProfile profilePicture={profilePicture} loggedInUser={props.user} user={user}/><Spacer></Spacer><UserPosts posts={posts}/></ProfileContainer> ):<></>;

  return (
    <Container>
      {console.log(posts)}
      <Spacer></Spacer>

          {profile}
<Spacer></Spacer>
    </Container>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Profile);
