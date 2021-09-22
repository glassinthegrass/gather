import React, { useState, useEffect,useContext } from "react";
import { userContext } from "../../userContext";
import axios from "axios";
import Groups from "./Groups";
import { useHistory } from "react-router";

import styled, { keyframes } from "styled-components";
import Posts from "../Groups/Posts";
import Birthdays from "./Birthdays";

const Home = (props) => {
  const history = useHistory();
  const { push } = history;
const [postsToggle,setPostsToggle]=useState(false)
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [loadingToggle, setLoadingToggle] = useState(true);
  const [offset, setOffset] = useState(0);
  const [offsetToggle, setOffsetToggle] = useState(true);
  const [idx, setIdx] = useState(0);
  const [user] = useContext(userContext)
   const { user_id, isLoggedIn } = user;

  setInterval(() => {
    if (birthdays[0]) {
      if (idx < birthdays.length - 1) {
        setIdx(idx + 1);
      } else {
        setIdx(0);
      }
    }
  }, 10000);

  useEffect(() => {
    if (isLoggedIn === false) {
      push("/");
    }
  }, [isLoggedIn, push]);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`/api/home/${user_id}`)
        .then((res) => {
          setGroups(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn,user_id]);

  useEffect(() => {
    if (offsetToggle) {
      setOffsetToggle(false);
      axios
        .get(`/api/home-posts?user_id=${user_id}&offset=${offset}`)
        .then((res) => {
          setPosts([...posts, res.data].flat());
          if(res.data.length % 10!==0){
            setPostsToggle(true)
          }
        })
        .catch((err) => console.log(err));
      setOffset(offset + 10);
    }
  }, [offsetToggle, offset, user_id, posts]);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`/api/birthday?user_id=${user_id}`)
        .then((res) => setBirthdays(res.data))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn,user_id]);

  const handleMorePosts = () => {
    setOffsetToggle(true);
  };

  const mappedGroups = groups.map((group, i) => {
    return <Groups group={group} key={i} />;
  });

  let mappedPosts = posts.map((post, i) => {
    return (
      <Posts
        key={i}
        post={post}
        loggedInUser={user_id}
        group_name={post.group_name}
        group_picture_public_id={post.group_picture_public_id}
        group_picture_version={post.group_picture_version}
      />
    );
  });

  const handleLoading = () => {
    setInterval(() => {
      setLoadingToggle(false);
    }, 1000);
  };

  useEffect(() => {
    if (loadingToggle === true) {
      handleLoading();
    }
  }, [loadingToggle]);

  let gotAllPosts =
      postsToggle ?(
      <AddPosts>That's it!</AddPosts>
      ) : (
      <AddPosts onClick={() => handleMorePosts()}>More</AddPosts>
    );

  return (
    <HomeDiv>
      <Box>
        <Title>Your Hives</Title>
        <GroupsDiv>{mappedGroups}</GroupsDiv>
        <Announce>
          <Birthdays birthday={birthdays[idx]} />
        </Announce>
        <Spacer></Spacer>
        <PostContainer onScroll={(e)=>console.log(e.target)}>{mappedPosts}</PostContainer>
        <Spacer></Spacer>
        {gotAllPosts}
        <Spacer></Spacer>
      </Box>
      {console.log(user)}
    </HomeDiv>
  );
};

export default Home;

export const fadeIn = keyframes`
0% {opacity:0;}
70%{opacity:0;}
100%{opacity:100;}
`;

const HomeDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  width: 100vw;
  min-height: 95vh;
  z-index: 1;

  font-weight: 900;
`;

let GroupsDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: rgb(252, 219, 165);
  justify-content: flex-start;
  overflow-x: scroll;
  z-index: 1;
  border-bottom: 0.5px dotted rgb(88, 88, 88, 0.5);
`;
let Title = styled.div`
  background-color: rgb(252, 219, 165);
  width: 100%;

  font-weight: 900;
  border-bottom: 0.5px dotted rgb(88, 88, 88, 0.5);
  z-index: 1;
`;
let Spacer = styled.div`
  width: 100%;
  height: 1rem;
`;
let Announce = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
`;
let PostContainer = styled.div`
  display: flex;
  flex-direction: column;

`;
let Box = styled.div`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 0.6s linear;
  animation-iteration-count: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
let AddPosts = styled.div`
  height: 2rem;
  width: 6rem;
  font-size: 20px;

  font-weight: 900;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px 30px 30px 30px;
  background-color: rgb(252, 219, 166);
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  cursor: pointer;
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`;
