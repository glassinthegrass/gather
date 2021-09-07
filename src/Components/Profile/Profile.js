import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser } from "../../redux/userReducer";
import styled from "styled-components";
import UserPosts from "./UserPosts";
import UserProfile from "./UserProfile";
import Groups from "../Profile/Groups";

const Profile = (props) => {
  let loggedInUser = props.user;

  const history = useHistory(),
    { push, goBack } = history;
  const { user_id } = props.match.params;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [offsetToggle, setOffsetToggle] = useState(true);
  const [loadingToggle, setLoadingToggle] = useState(true);
  const [profilePicture, setProfilePicture] = useState("");
  const [toggle, setToggle] = useState(null);
  const { picture_public_id, picture_version } = user;

  const handleSetToggle = (loadingToggle) => {
    setLoadingToggle(!loadingToggle);
  };
  const handleLoadingToggle = () => {
    setLoadingToggle(true);
    setInterval(() => {
      setLoadingToggle(false);
    }, 500);
  };
  useEffect(() => {
    if (loadingToggle === true) {
      handleLoadingToggle();
    }
  });
  useEffect(() => {
    if (user_id !== loggedInUser.user_id) {
      handleLoadingToggle();
    }
  }, [user_id, loggedInUser]);

  useEffect(() => {
    if (loggedInUser.isLoggedIn === false) {
      push("/");
    }
  }, [loggedInUser.isLoggedIn, push]);

  useEffect(() => {
    setPosts([]);
    axios
      .get(`/api/profile/${user_id}`)
      .then((res) => {
        setUser(res.data);
        setOffset(0);
        setOffsetToggle(true);
      })
      .catch((err) => console.log(err));
  }, [user_id]);

  useEffect(() => {
    if (offsetToggle) {
      setOffsetToggle(false);
      axios
        .get(`/api/posts?user_id=${user_id}&offset=${offset}`)
        .then((res) => {
          setPosts([...posts, res.data].flat());
        })
        .catch((err) => console.log(err));
      setOffset(offset + 10);
    }
  }, [offsetToggle, user_id, offset, posts]);

  useEffect(() => {
    if (picture_public_id) {
      setProfilePicture(
        `https://res.cloudinary.com/glassinthegrass/image/upload/w_200,h_250,g_auto,c_fill,r_5,f_png/` +
          picture_version +
          "/" +
          picture_public_id
      );
    }
  }, [picture_version, picture_public_id]);

  const handleOffsetPosts = () => {
    setOffsetToggle(true);
  };
  const handleProfileSubmit = (newInfo) => {
    axios
      .put(`/auth/user`, { newInfo })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  const handleEmailSubmit = (email, newEmail, password) => {
    axios
      .put(
        `/auth/email?email=${email}&newEmail=${newEmail}&password=${password}`
      )
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
    props.getUser(user_id);
  };
  const togglePosts = () => {
    toggle === null || toggle === true ? setToggle(false) : setToggle(null);
  };
  const toggleGroups = () => {
    toggle === null || toggle === false ? setToggle(true) : setToggle(null);
  };
  let postsOrGroups =
    toggle === null ? (
      <></>
    ) : toggle === false ? (
      <ProfileContainer>
        <UserPosts loggedInUser={loggedInUser.user_id} posts={posts} />
        {posts.length % 10 === 0 ? (
          <AddPosts onClick={() => handleOffsetPosts()}>{`More`}</AddPosts>
        ) : (
          <AddPosts>All Done</AddPosts>
        )}
      </ProfileContainer>
    ) : (
      <Groups loggedInUser={props.user} user={user} />
    );

  return (
    <Container>
      <Back onClick={() => goBack(1)}>{"<<<"}</Back>
      <Spacer></Spacer>
      <ProfileContainer>
        <UserProfile
          handleSetToggle={handleSetToggle}
          handleEmailSubmit={handleEmailSubmit}
          handleSubmit={handleProfileSubmit}
          profilePicture={profilePicture}
          loggedInUser={props.user}
          push={push}
          user={user}
          handleLoadingToggle={handleLoadingToggle}
          loadingToggle={loadingToggle}
        />
      </ProfileContainer>
      <Spacer></Spacer>

      <Row>
        <PostToggle onClick={togglePosts}>Posts</PostToggle>
        <PostToggle onClick={toggleGroups}>Groups</PostToggle>
      </Row>
      <PostsOrGroups>{postsOrGroups}</PostsOrGroups>
    </Container>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { getUser })(Profile);
let Container = styled.section`
  width: 100vw;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
let PostToggle = styled.h1`
  border: 1px solid rgb(88, 88, 88, 0.5);
  width: 50%;
  height: 30px;
  font-size: 8px;
  background-color: rgb(252, 219, 166);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
  z-index: 1;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`;

let Row = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
`;
let Spacer = styled.div`
  width: 100%;
  height: 2rem;
  z-index: 1;
`;
let ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
let PostsOrGroups = styled.section`
  width: 100%;
  min-height: 15vh;
  background-color: rgb(88, 88, 88, 0.5);
  padding-top: 5vh;
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
  font-weight: 900;
  align-items: center;
  justify-content: center;
  margin-right: 92vw;
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
