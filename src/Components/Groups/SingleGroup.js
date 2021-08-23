import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import SingleGroupUsers from './SingleGroupUsers'
import Posts from "./Posts";
let Spacer = styled.div`
height:25px;
width:100%;
`
let Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items:center;
  width: 100vw;
  min-height:90vh;
`;

let GroupName = styled.h1`
  font-family: "Nunito Black";
  font-size: 70px;
`;
let PostContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  
  padding-bottom:3rem;
`;

let GroupHeader = styled.header`
display:flex;
align-items:center;
flex-direction:column;
width:90%;
min-width:425px;
background-color:rgb(88,88,88,0.7);
`

const SingleGroup = (props) => {
  const history = useHistory(),
    { push } = history;
  const [group, setGroup] = useState({});
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [users, setUsers] = useState([]);

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
        setPosts(res.data[3]);
      })
      .catch((err) => console.log(err));
  }, [group_name]);

  let image = useCallback(() => {
    setGroupUrl(
      `https://res.cloudinary.com/glassinthegrass/image/upload/w_400,h_400,c_fill_pad,g_auto,f_auto/${picture_version}/${picture_public_id}`
    );
  }, [picture_version, picture_public_id]);

  let redirect = useCallback(() => {
    push("/");
  }, [push]);

  useEffect(() => {
    if (isLoggedIn === true) {
      image();
    } else if (isLoggedIn === false) {
      redirect();
    }
  }, [isLoggedIn, image, redirect]);

  const handleAddPost = (post) => {
    setPosts([...posts, post]);
  };

  const handleAdd =(group_id,person_id)=>{
    axios.post(`/api/groups/add-person?group_id=${group_id}&person_id=${person_id}`).then(res=>setPeople(res.data)).catch(err=>console.log(err))
}
  let mappedPosts = posts.map((post, i) => {
    return <Posts key={i} post={post} group_name={group_name} group_picture_public_id={picture_public_id} group_picture_version={picture_version}/>;
  });
  

  return (
    <>

      <Container><div>
        <Spacer></Spacer>
        </div>
        <GroupHeader>
          <GroupName>{group.group_name}</GroupName>
          <img src={groupUrl} alt="asdf" />
          </GroupHeader>
          <CreatePost
            user={props.user}
            group={group}
            posts={posts}
            handleAddPost={handleAddPost}
            />
            <div>
          <Spacer></Spacer>
          </div>
        <PostContainer>{mappedPosts}</PostContainer>


      </Container>

      <SingleGroupUsers handleAdd={handleAdd} group={group} users={users} people={people}/>


    </>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(SingleGroup);
