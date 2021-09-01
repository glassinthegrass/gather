import React from "react";
import Posts from "../Groups/Posts";
import styled from "styled-components";

let Container = styled.section`
width:100vw;
min-height:90vh;
`
const UserPosts = (props) => {
  const { posts,loggedInUser } = props;

  let mappedPosts = posts ? (
    posts.map((post, i) => {
      return (
        <Posts key={i} post={post} loggedInUser={loggedInUser} group_name={post.group_name} group_picture_public_id={post.group_picture_public_id} group_picture_version={post.group_picture_version} />
      );
    })
  ) : (
    <></>
  );

  return <Container>{mappedPosts}</Container>;
};

export default UserPosts;
