import React from "react";
import styled from "styled-components";
import {Image,Transformation} from 'cloudinary-react'
const Comment = ({comment}) => {
  const { picture_public_id, username, comment_content } =comment;

  return (
    <CommentContainer>
      <Img><Image publicId={picture_public_id}><Transformation width='30' height='30' radius='max' crop='fill' gravity='face' fetch_format='png'/></Image></Img>

      <Column>
        <CommentUsername>{username}</CommentUsername>
        <CommentText>{comment_content}</CommentText>
      </Column>
    </CommentContainer>
  );
};

export default Comment;
let CommentContainer = styled.div`
  width: 22rem;
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 1px;
  margin-bottom: 2px;
`;
let Img = styled.div`
  width: 25px;
  height: 25px;
  padding: 3px;
`;
let CommentText = styled.p`
  font-size: 14px;
  font-family:Nunito, Roboto, sans-serif;
  font-weight: 300;
  border-radius: 10px;
  padding: 5px;
  width: 90%;
  margin: 3px;
  padding-top: 2px;
  margin-top: 0px;
  text-align: left;
  background-color: rgb(245, 240, 232);
`;
let CommentUsername = styled(CommentText)`
  font-size: 8px;
  font-family:Nunito, Roboto, sans-serif;
  font-weight: 400;
  width: 30%;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 2px;
  margin-top: 2px;
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
