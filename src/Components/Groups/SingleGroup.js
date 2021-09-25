import axios from "axios";
import React, { useState, useEffect,useContext, useCallback } from "react";
import { userContext } from "../../userContext";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import SingleGroupUsers from "./SingleGroupUsers";
import Posts from "./Posts";
import { fadeIn } from "../Home/Home";

const SingleGroup = (props) => {
  const [user]=useContext(userContext);
  const { isLoggedIn, user_id } = user;
  const history = useHistory(),
    { push, goBack } = history;
  const [group, setGroup] = useState({});
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [member, setMember] = useState(false);
  const [groupUrl, setGroupUrl] = useState("");
  const { group_name } = props.match.params;
  const [offset, setOffset] = useState(0);
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

  const handleGetMorePosts = () => {
    setOffset(offset + 10);
    axios
      .get(`/api/group-posts?group_name=${group_name}&offset=${offset}`)
      .then((res) => setPosts([res.data, ...posts].flat()))
      .catch((err) => console.log(err));
  };
  let imageCall = useCallback(() => {
    if (picture_version) {
      setGroupUrl(
        `https://res.cloudinary.com/glassinthegrass/image/upload/w_400,h_400,c_fill_pad,g_auto,f_auto/${picture_version}/${picture_public_id}`
      );
    }
  }, [picture_version, picture_public_id]);

  let redirect = useCallback(() => {
    push("/");
  }, [push]);

  useEffect(() => {
    if (isLoggedIn === true) {
      imageCall();
    } else if (isLoggedIn === false) {
      redirect();
    }
  }, [isLoggedIn, imageCall, redirect]);
  useEffect(() => {
    if (group?.group_id) {
      axios
        .get(`/api/member/groups?group_id=${group.group_id}&user_id=${user_id}`)
        .then((res) => setMember(res.data))
        .catch((err) => console.log(err));
    }
  }, [group?.group_id, user_id]);

  const handleAddPost = (post) => {
    setPosts([post, ...posts]);
  };

  const handleAdd = (group_id, person_id) => {
    axios
      .post(
        `/api/groups/add-person?group_id=${group_id}&person_id=${person_id}`
      )
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  };
  const handleDelete = (group_id, person_id) => {
    axios
      .put(`/api/groups/${group_id}/person/${person_id}`)
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  };

  let mappedPosts = posts.map((post, i) => {
    return (
      <Posts
        key={i}
        post={post}
        loggedInUser={user_id}
        group_name={group_name}
        group_picture_public_id={picture_public_id}
        group_picture_version={picture_version}
      />
    );
  });

  const handleContent = (content) => {
    setPostContent(content);
  };
  const handleImage = (img) => {
    if (img[0]) {
      setImage(img[0]);
      setPreview(URL.createObjectURL(img[0]));
    } else {
      setImage([]);
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    let fileData = new FormData();
    fileData.append("image", image);

    let config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `/api/groupPosts/${group.group_id}/user/${user_id}?post_content=${postContent}`,
        fileData,
        config
      )
      .then((res) => {
        handleAddPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

    setPostContent("");
    setImage([]);
    setPreview(null);
  };

  const handleLeave = () => {
    axios
      .delete(
        `/api/groups?user=${user_id}&group_id=${
          group.group_id
        }&filter=${"singleGroup"}&loggedInUser=${user_id}`
      )
      .then((res) => setMember(res.data))
      .catch((err) => console.log(err));
  };

  const handleJoin = () => {
    axios
      .post(
        `/api/groups/member?group_id=${
          group.group_id
        }&user=${user_id}&filter=${"singleGroup"}&loggedInUser=${user_id}`
      )
      .then((res) => setMember(res.data))
      .catch((err) => console.log(err));
  };

  let FollowUnfollow = member ? (
    <Unfollow onClick={() => handleLeave()}>unfollow</Unfollow>
  ) : (
    <Follow onClick={() => handleJoin()}>follow</Follow>
  );

  return (
    <Fade>
      <Back onClick={() => goBack(1)}>{"<"}</Back>
      <Container>
        {FollowUnfollow}
        <GroupHeader>
          <GroupName>{group.group_name}</GroupName>
          <GroupSubject>
            {"("}
            {group?.subject}
            {")"}
          </GroupSubject>
          <GroupImage src={groupUrl} alt="" />
        </GroupHeader>
        <div>
          <CreatePost
            loading={loading}
            preview={preview}
            postContent={postContent}
            handlePostContent={handleContent}
            handleImage={handleImage}
            handleSubmit={handleSubmit}
            user={props.user}
            group={group}
            posts={posts}
          />
          <Spacer></Spacer>
        </div>
        <PostContainer>{mappedPosts}</PostContainer>
        {posts.length % 10 === 0 ? (
          <AddPosts onClick={() => handleGetMorePosts()}>More</AddPosts>
        ) : (
          <AddPosts>All Done</AddPosts>
        )}
      </Container>

      <SingleGroupUsers
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        group={group}
        users={users}
        people={people}
        loggedInUser={user_id}
      />
    </Fade>
  );
};

export default SingleGroup;

let Follow = styled.div`
  height: 2rem;
  width: 100%;
  background-color: rgb(252, 142, 52);

  font-weight: 600;
  display: flex;
  align-items: flex-end;
  padding: 1px;
  color: rgb(88, 88, 88);
  cursor: pointer;
  &:hover {
    color: rgb(252, 142, 52);
    background-color: rgb(88, 88, 88);
  }
  &:active {
    background-color: rgb(252, 142, 52);
  }
`;
let Unfollow = styled(Follow)`
  background-color: rgb(88, 88, 88);
  color: rgb(252, 142, 52);
  &:hover {
    color: rgb(88, 88, 88);
    background-color: rgb(252, 142, 52);
  }
  &:active {
    background-color: rgb(88, 88, 88);
  }
`;
let Spacer = styled.div`
  height: 25px;
  width: 100%;
`;
let Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`;
let GroupImage = styled.img`
  width: 400px;
  height: 400px;
  @media (max-width: 600px) {
    width: 250px;
    height: 250px;
  }
`;
let GroupName = styled.h1`

  font-weight: 900;
  font-size: 60px;
  @media (min-width: 800px) {
    font-size: 70px;
  }
  @media (max-width: 600px) {
    font-size: 45px;
  }
`;
let GroupSubject = styled.p`

  font-weight: 300;
  font-size: 14px;
`;
let PostContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 3rem;
`;

let GroupHeader = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  background-color: rgb(252, 219, 166);
  @media (max-width: 600px) {
    width: 100%;
  }
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
let Back = styled.div`
  position: fixed;
  display: flex;
padding:2px;
width:2rem;
  font-weight: 900;
  align-items: center;
  justify-content: center;
margin-left:2rem;
  margin-top: -3.5rem;
  z-index: 5;
  font-size: 30px;
  cursor: pointer;
  border-radius: 3px;
  background-color: rgb(88, 88, 88);
  color: rgb(252, 142, 52);
  @media (max-width: 600px) {
    margin-top: -2.2rem;
    margin-right: 87vw;
  }
  &:hover {
    color: rgb(88, 88, 88);
    background-color: white;
  }
`;
const Fade = styled.div`
  display: flex;
  width: 100vw;
  min-height: 92vh;
  animation: ${fadeIn} 0.5s linear;
`;
