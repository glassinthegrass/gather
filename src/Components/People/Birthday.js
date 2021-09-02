import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Posts from "../Groups/Posts";
import BirthdayCard from "./BirthdayCard";
import CreatePost from "./CreatePost";

const Birthday = (props) => {
  const { isLoggedIn, user_id } = props.user;
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [idx, setIdx] = useState(0);
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(null);
  const [postContent, setPostContent] = useState("");
  const push = useHistory().push;
  useEffect(() => {
    if (isLoggedIn === true) {
      axios
        .get(`/api/birthday?user_id=${user_id}`)
        .then((res) => setBirthdays(res.data))
        .catch((err) => console.log(err));
    } else {
      push("/");
    }
  }, [isLoggedIn, user_id, push]);

  useEffect(() => {
    if (isLoggedIn === true && birthdays[0]) {
      axios
        .get(`/api/birthday-post?person_id=${birthdays[idx]?.person_id}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, idx, birthdays]);

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
        `/api/birthday-post?post_content=${postContent}&user_id=${user_id}&person_id=${birthdays[idx]?.person_id}`,
        fileData,
        config
      )
      .then((res) => {
        setPosts([...posts, res.data]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
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
  const handleIncrease = () => {
    if (idx < birthdays.length - 1) {
      setIdx(idx + 1);
    } else {
      setIdx(0);
    }
  };
  const handleDecrease = () => {
    if (idx > 0) {
      setIdx(idx - 1);
    } else {
      setIdx(birthdays.length - 1);
    }
  };

  const mappedPosts = posts[0] ? (
    posts.map((post, i) => {
      return (
        <Posts
          key={i}
          post={post}
          group_name={birthdays[idx].first_name}
          group_picture_public_id={birthdays[idx].person_picture_public_id}
          group_picture_version={birthdays[idx].person_picture_version}
        />
      );
    })
  ) : (
    <></>
  );

  return (
    <Container>
      <Column>
        <BirthdayCard push={push} birthdays={birthdays} idx={idx} />
        <Row>
          <Arrow className="arrow" onClick={handleDecrease}>
            {"<"}
          </Arrow>
          <Arrow className="arrow" onClick={handleIncrease}>
            {">"}
          </Arrow>
        </Row>
        <CreatePost
          loading={loading}
          handleContent={handleContent}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          preview={preview}
          birthday={birthdays[idx]}
        />
      </Column>

      <Spacer></Spacer>
      <PostContainer>{mappedPosts}</PostContainer>
    </Container>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Birthday);

let Spacer = styled.div`
  height: 1rem;
  width: 100%;
`;
let Container = styled.section`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
let PostContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
let Arrow = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  font-family: "Nunito Black";
  font-size: 80px;
  border-radius: 10px 10px 10px 10px;
  background-color: rgb(88, 88, 88, 0.2);
  color: rgb(252, 219, 165, 0.4);
  cursor: pointer;
  &:hover {
    color: rgb(252, 219, 165);
  }
`;
let Row = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  min-height: 42vh;
  justify-content: space-around;
  align-items: center;
  width: 33rem;
  margin-top: 5rem;
  &:hover .arrow {
    display: flex;
  }
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 10px 10px;
  background-color: rgb(252, 219, 165);
  margin-top: 2rem;
`;
