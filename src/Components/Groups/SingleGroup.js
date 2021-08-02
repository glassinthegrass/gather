import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
let GroupImage = styled.img`
  background-color: rgb(88, 88, 88, 0.7);
`;
let GroupName = styled.h1`
  font-family: "Nunito Black";
  font-size: 70px;
`;

const SingleGroup = (props) => {
  const history = useHistory(),
  {push}=history
  const [group, setGroup] = useState({});
  const [posts,setPosts]=useState(null);
  const [people, setPeople] = useState({});
  const [users, setUsers] = useState({});
  
  const [groupUrl, setGroupUrl] = useState("");
  const { group_name } = props.match.params;
  const { isLoggedIn } = props.user;
  const { picture_version, picture_public_id } = group;

useEffect(() => {
  axios
    .get(`/api/group/${group_name}`)
    .then((res) => {
      setGroup(res.data[0]);
      setPeople(res.data[1]);
      setUsers(res.data[2]);
      setPosts(res.data[3])
    })
    .catch((err) => console.log(err));
}, [group_name]);

  let image = useCallback(() => {
    setGroupUrl(
      `https://res.cloudinary.com/glassinthegrass/image/upload/w_1150,h_350,c_pad,f_auto/${picture_version}/${picture_public_id}`
    );
  }, [picture_version, picture_public_id]);

  let redirect = useCallback(() => {
    push("/");
  }, [push]);

  useEffect(() => {
    if (isLoggedIn === true) {
      image();
    } else if(isLoggedIn ===false){
      redirect();
    }
  }, [isLoggedIn, image, redirect]);

let mappedPosts = posts? posts.map((post,i)=>{
    return <Posts key={i} post={post}/>
}):<></>;

  return (
    <section>
        {console.log(posts)}
      <div>
        <GroupName>{group.group_name}</GroupName>
        <GroupImage src={groupUrl} alt="asdf" />
      </div>
<CreatePost user={props.user} group={group} posts={posts} setPosts={setPosts}/>
        {mappedPosts}
    </section>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(SingleGroup);
