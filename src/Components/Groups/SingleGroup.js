import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import SingleGroupUsers from "./SingleGroupUsers";
import Posts from "./Posts";
let Follow = styled.div`
  height: 2rem;
  width: 100%;
  background-color: rgb(252, 142, 52);
  font-family: "Nunito SemiBold";
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
  width: 100vw;
  min-height: 92vh;
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
  font-family: "Nunito Black";
  font-size: 70px;
  @media (max-width: 600px) {
    font-size: 45px;
  }
`;
let PostContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
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

const SingleGroup = (props) => {
  const history = useHistory(),
    { push } = history;
  const [group, setGroup] = useState({});
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [users, setUsers] = useState([]);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [member, setMember] = useState(false);
  const [groupUrl, setGroupUrl] = useState("");
  const { group_name } = props.match.params;
  const { isLoggedIn, user_id } = props.user;
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

  let imageCall = useCallback(() => {
    setGroupUrl(
      `https://res.cloudinary.com/glassinthegrass/image/upload/w_400,h_400,c_fill_pad,g_auto,f_auto/${picture_version}/${picture_public_id}`
    );
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
    setPosts([...posts, post]);
  };

  const handleAdd = (group_id, person_id) => {
    axios
      .post(
        `/api/groups/add-person?group_id=${group_id}&person_id=${person_id}`
      )
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  };

  let mappedPosts = posts.map((post, i) => {
    console.log(post)
    return (
      <Posts
        key={i}
        post={post}
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
      .then((res) => handleAddPost(res.data))
      .catch((err) => console.log(err));

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
    <>
      <Container>
        {FollowUnfollow}
        <GroupHeader>
          {group.creation_date}
          <GroupName>{group.group_name}</GroupName>
          <GroupImage src={groupUrl} alt="" />
        </GroupHeader>
        <CreatePost
          preview={preview}
          postContent={postContent}
          handlePostContent={handleContent}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          user={props.user}
          group={group}
          posts={posts}
        />
        <div>
          <Spacer></Spacer>
        </div>
        <PostContainer>{mappedPosts}</PostContainer>
      </Container>

      <SingleGroupUsers
        handleAdd={handleAdd}
        group={group}
        users={users}
        people={people}
      />

      {console.log(member)}
    </>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(SingleGroup);
