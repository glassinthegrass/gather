import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserPosts from "./UserPosts";
import UserProfile from "./UserProfile";
import Groups from '../Profile/Groups';

let PostToggle= styled.h1`
border:1px solid rgb(88,88,88,0.5);
width: 50vw;
height: 30px;
font-size: 8px;
background-color: rgb(252, 219, 166);
display: flex;
justify-content: center;
align-items:center;
font-family:'Nunito Light';
font-size:20px;
box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
&:hover {
  background-color: rgb(88,88,88);
color:rgb(252, 142, 52, 0.792);
};
&:active{
  background-color:rgb(252,142,52,0.792);
  color:rgb(88,88,88);
};
`

let Container = styled.section`
  width: 100vw;
min-height:90vh;
display:flex;
flex-direction:column;
align-items:flex-end;


`;
let Row = styled.div`
display:flex;
`
let Spacer= styled.div`
width:100vw;
height:2rem;
`
let ProfileContainer = styled.div`
display:flex;
flex-direction:column;

`
let PostsOrGroups = styled.section`
width:100vw;
min-height:14vh;
background-color:rgb(88,88,88,0.5);
padding-top:5vh;
`
const Profile = (props) => {

  let loggedInUser= props.user;

  const history = useHistory(),
    { push } = history;
  const { user_id } = props.match.params;
  const [user, setUser] = useState('');

  const [posts, setPosts] = useState('');
  const [profilePicture, setProfilePicture] = useState("");
  const[toggle,setToggle]=useState(null);

useEffect(()=>{
    if(loggedInUser.isLoggedIn===false){
        push('/')
    } 
},[loggedInUser.isLoggedIn,push])


  useEffect(() => {
    axios
    .get(`/api/profile/${user_id}`)
    .then((res) => {
      setUser(res.data[0]);
    })
    .catch((err) => console.log(err));
  }, [user_id]);

  useEffect(()=>{
    axios.get(`/api/posts?user_id=${user_id}`).then(res=> setPosts(res.data))
  },[user_id])
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

const togglePosts=()=>{
  toggle===null||toggle===true?setToggle(false):setToggle(null);
}
const toggleGroups=()=>{
  toggle===null||toggle===false ?setToggle(true):setToggle(null);
}
let postsOrGroups = toggle===null?<></>:toggle ===false? <div><UserPosts posts={posts}/></div>:<Groups loggedInUser={props.user} user={user}/>;

  return (
    <Container>
      <Spacer></Spacer>
      <Spacer></Spacer>
         <ProfileContainer><UserProfile profilePicture={profilePicture} loggedInUser={props.user} user={user}/></ProfileContainer> 
      <Spacer></Spacer>
      <Spacer></Spacer>
      <Row><PostToggle onClick={togglePosts}>Posts</PostToggle><PostToggle onClick={toggleGroups}>Groups</PostToggle></Row>
          <PostsOrGroups>{postsOrGroups}</PostsOrGroups>


    </Container>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Profile);
