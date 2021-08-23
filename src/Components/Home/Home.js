import React, { useState, useEffect } from "react";
import axios from "axios";
import Groups from "./Groups";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import styled from "styled-components";
import Posts from "../Groups/Posts";
import Birthdays from "./Birthdays";

const HomeDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100vw;
  min-height: 90vh;
  font-family: "Nunito Black";
  `;
  
  let GroupsDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: rgb(252, 219, 165);
  justify-content: flex-start;
  overflow-x: scroll;

  border-bottom: 0.5px dotted rgb(88, 88, 88, 0.5);
  `;
  let Title = styled.div`
  background-color: rgb(252, 219, 165);
  width: 100%;
  padding: 3px;
  border-bottom: 0.5px dotted rgb(88, 88, 88, 0.5);
  `;
  let Spacer = styled.div`
  width: 100%;
  height: 1rem;
  `;
  let Announce=styled.div`
width:100%;
display:flex;
justify-content:center;
  `
  const Home = (props) => {
    const history = useHistory();
    const { push } = history;
    const [groups, setGroups] = useState([]);
    const [posts, setPosts] = useState([]);
    const [birthdays, setBirthdays] = useState([]);

  const [idx,setIdx]=useState(0);
  const { user_id, isLoggedIn } = props.user;
  
  setInterval(()=>{
    if(birthdays[0]){
      if(idx<birthdays.length-1){
        setIdx(idx+1)
  
      }else{
        setIdx(0)
      }
    }
  },20000)

  useEffect(() => {
    if (isLoggedIn === true) {
      axios
      .get(`/api/home/${user_id}`)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => console.log(err));
    }else{
      push('/')
    }
  }, [isLoggedIn, user_id,push]);
  
  useEffect(() => {
    if (isLoggedIn === true) {
      axios
      .get(`/api/home-posts?user_id=${user_id}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn, user_id]);
  
  useEffect(() => {
    if (isLoggedIn === true) {
      axios
        .get(`/api/birthday?user_id=${user_id}`)
        .then((res) => setBirthdays(res.data))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn,user_id]);

 

  const mappedGroups = groups ? (
    groups.map((group, i) => {
      return <Groups group={group} key={i} />;
    })
  ) : (
    <></>
  );
  let mappedPosts = posts ? (
    posts.map((post, i) => {
      return (
        <Posts
          key={i}
          post={post}
          group_name={post.group_name}
          group_picture_public_id={post.group_picture_public_id}
          group_picture_version={post.group_picture_version}
        />
      );
    })
  ) : (
    <></>
  );

  return (
    <HomeDiv>
      <Title>Your Hives</Title>
      <GroupsDiv>{mappedGroups}</GroupsDiv>
     <Announce>
     <Birthdays birthday={birthdays[idx]} />
       </Announce> 

      <Spacer></Spacer>
      {mappedPosts}

    </HomeDiv>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Home);
