//modules
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import styled, { keyframes } from "styled-components";
//components
import Groups from "./Groups";
import Posts from "../Groups/Posts";
//data
import { userContext } from "../../Context/userContext";

const Home = (props) => {
  const push = useHistory().push;
  //loggedInUser info
  const [user] = useContext(userContext),
    { user_id, isLoggedIn } = user;
  //states
  const [postsToggle, setPostsToggle] = useState(false),
    [birthdays, setBirthdays] = useState([]),
    [groups, setGroups] = useState([]),
    [posts, setPosts] = useState([]),
    [loadingToggle, setLoadingToggle] = useState(true),
    [offsetToggle, setOffsetToggle] = useState(true),
    [offset, setOffset] = useState(0);
  //redirect
  useEffect(() => {
    if (isLoggedIn === false) {
      push("/");
    }
  }, [isLoggedIn, push]);
  //axios calls lots of data
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`/api/home/${user_id}`)
        .then((res) => {
          setGroups(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, user_id]);

  useEffect(() => {
    if (offsetToggle) {
      setOffsetToggle(false);
      axios
        .get(`/api/home-posts?user_id=${user_id}&offset=${offset}`)
        .then((res) => {
          setPosts([...posts, res.data].flat());
          if (res.data.length % 10 !== 0) {
            setPostsToggle(true);
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
  }, [isLoggedIn, user_id]);

  //weird toggle function to fix unknown issue with retrieving and combining posts. look at later
  const handleMorePosts = () => {
    setOffsetToggle(true);
  };

  const handleLoading = () => {
    setInterval(() => {
      setLoadingToggle(false);
    }, 1000);
  };

  useEffect(() => {
    if (loadingToggle) {
      handleLoading();
    }
  }, [loadingToggle]);

  //maps
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

  let gotAllPosts = postsToggle ? (
    <AddPosts>That's it!</AddPosts>
  ) : (
    <AddPosts onClick={() => handleMorePosts()}>More</AddPosts>
  );
  let birthday = birthdays[0] && (
    <BirthdayContainer onClick={() => push(`/birthdays`)}>
      <Text>A Very Special Person Has A Birthday!</Text>
      <Text>Click to Leave a Birthday Wish!</Text>
    </BirthdayContainer>
  );
  //main display
  let display = (
    <Box>
      <GroupBox>
        <Title>Your Hives</Title>
        <GroupsDiv>{mappedGroups}</GroupsDiv>
        <Announce>{birthday}</Announce>
      </GroupBox>
      <Spacer></Spacer>
      <PostContainer>{mappedPosts}</PostContainer>
      <Spacer></Spacer>
      {gotAllPosts}
      <Spacer></Spacer>
    </Box>
  );

  return <HomeDiv>{display}</HomeDiv>;
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
  min-height: 94vh;
  z-index: 1;
  font-weight: 900;
  ${(props) => (props.theme.dark ? props.theme.backgroundColor : "")};
  ${(props) => props.theme.color};
`;

let GroupsDiv = styled.div`
  display: flex;
  width: 100%;

  justify-content: flex-start;
  overflow-x: scroll;
  z-index: 1;
  border-bottom: 0.5px dotted rgb(88, 88, 88, 0.5);
`;
let Title = styled.div`
  ${(props) =>
    props.theme.dark
      ? props.theme.backgroundColor
      : "background-color:rgb(88,88,88,0.2)"};
  width: 100%;
  ${(props) => props.theme.color};
  font-size: 35px;
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
  ${(props) => props.theme.color};
`;
let GroupBox = styled.div`
  ${(props) =>
    props.theme.dark
      ? props.theme.backgroundColor
      : "background-color: rgb(252, 219, 165)"};
  width: 100%;
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
  ${(props) =>
    props.theme.dark
      ? props.theme.solidBackgroundColor
      : "background-color: rgb(252, 219, 166)"};
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
let BirthdayContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${(props) =>
    props.theme.dark
      ? props.theme.backgroundColor
      : "background-color: rgb(88,88,88,0.1)"};
  cursor: pointer;
`;

let Text = styled.p`
  display: flex;
  font-weight: 600;
  font-size: 15px;
  align-items: center;
  white-space: nowrap;
  padding-left: 10px;
  padding-right: 10px;
  ${(props) => props.theme.color + ";" + props.theme.fontShadow};
`;
