import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Posts from "../Groups/Posts";
import styled from "styled-components";
import Comment from "../Groups/Comment";

const PostPage = (props) => {
  const push = useHistory().push;
  const { isLoggedIn, user_id } = props.user;
  const post_id = useParams().post_id;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`/api/post/${post_id}`)
        .then((res) => setPost(res.data))
        .catch((err) => console.log(err));
    } else push("/");
  }, [isLoggedIn, post_id, push]);
  useEffect(() => {
    axios
      .get(`/api/comments/${post_id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [post_id]);

  const mappedComments = comments[0] ? (
    comments.map((comment, i) => {
      return <Comment comment={comment} key={i} />;
    })
  ) : (
    <></>
  );
  return (
    <Container>
      <PostComment>
        <Posts
          post={post}
          loggedInUser={user_id}
          group_name={post.group_name}
          group_picture_public_id={post.group_picture_public_id}
          group_picture_version={post.group_picture_version}
        />

        <Column>{mappedComments}</Column>
      </PostComment>
    </Container>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};
export default connect(mapStateToProps)(PostPage);
let Container = styled.section`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
let Column = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  border-radius: 10px;
  width: 22.5rem;
  padding: 1vw;
`;
let PostComment = styled.div`
  width: 50%;
  min-width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(88, 88, 88, 0.3);
  margin: 2rem;
  padding: 2rem;
  border-radius: 10px;
  font-weight: 400;
  border-radius: 10px;
`;
