import axios from "axios";
import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import line from "../../Assets/Gather_Dotted_Line.png";
import Comment from "./Comment";
let Container = styled.section`
  display: flex;
  justify-content: center;
  z-index: 0;
`;
let Line = styled.img`
  height: 4.2vh;
  position: absolute;
  margin-left: 4.5rem;
  margin-top: -0.9rem;
  transform: rotate(189deg);
`;
let PostRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  cursor: pointer;
`;
let PostContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 1px;
  width: 22rem;
  border-radius: 0px 0px 10px 10px;
`;

let PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(252, 219, 165);
  border-radius: 10px 10px 0px 0px;
  align-items: flex-end;
  border: 1px solid rgb(88, 88, 88, 0.2);
`;
let PostBody = styled.div`
  background-color: white;
  padding: 5px;
  padding-bottom: 0px;
  background-color: white;
  border-left: 1px solid rgb(88, 88, 88, 0.2);
  border-right: 1px solid rgb(88, 88, 88, 0.2);
`;

let PostContent = styled.p`
  display: flex;
  padding-bottom: 5px;
  justify-content: flex-start;
  text-align: left;
  background-color: white;
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  font-family: "Nunito Light";
`;
let CreationDate = styled(PostContent)`
  font-size: 8px;
  padding: 3px;
`;
let PostUser = styled.img`
  cursor: pointer;
  border: 1px solid rgb(88, 88, 88, 0.5);
  border-radius: 50%;
  margin: 5px;
`;

let PostPicture = styled.img`
  background-color: white;
  width: 90%;
`;
let UserName = styled.p`
  font-family: "Nunito SemiBold";
  font-size: 15px;
  margin-bottom: 8px;
  margin-left: -5px;
  white-space: nowrap;
`;
let GroupPicture = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid rgb(88, 88, 88, 0.5);
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
  z-index: 1;
`;
let GroupName = styled(UserName)`
  font-family: "Nunito Light";
  font-size: 10px;
  margin-right: -10px;
  margin-bottom: -1px;
  white-space: nowrap;
`;
let Row = styled.div`
  display: flex;

  justify-content: space-between;
  background-color: white;
  border-radius: 0px 0px 10px 10px;

  background-color: white;
  border-left: 1px solid rgb(88, 88, 88, 0.2);
  border-right: 1px solid rgb(88, 88, 88, 0.2);
  border-bottom: 1px solid rgb(88, 88, 88, 0.2);
`;
let CommentRow = styled(Row)`
  border-radius: 10px;
`;
let Input = styled.input`
  width: 80%;
height:1.4rem;
  border-radius: 10px 0px 0px 10px;
  inline-height: 12px;

  outline: none;
  resize: none;
  overflow: auto;
  font-family: "Nunito Light";
  font-size: 12px;
  margin-left: 5%;
  margin-top: 0.5%;
  margin-bottom: 1%;
  text-align: left;
`;
let Submit = styled.div`
  width: 10%;
  height: 1rem;
  border-radius: 0px 10px 10px 0px;
  padding: 5px;
  margin-right: 5%;
  border: 1px solid rgb(88, 88, 88);
  margin-top: 0.5%;
  cursor: pointer;
  background-color: rgb(252, 219, 165);
  font-family: "Nunito Light";
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
let CommentToggle = styled(CreationDate)`
  cursor: pointer;
`;
let SeeComments = styled(CommentToggle)`
  background-color: rgb(88, 88, 88, 0);
  margin-top: 3px;
  width: 20%;
`;
let HeaderBodyComment = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  border-radius: 10px;
`;
const Posts = (props) => {
  const [content, setContent] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [comment, setComment] = useState({});
  const path = useRouteMatch().path
  const push = useHistory().push;
  const { post, loggedInUser } = props;
  const { post_id } = post;

  let userUrl = post.user_picture_public_id
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,r_max,c_fill,g_face,f_png/${post.user_picture_version}/${post.user_picture_public_id}`
    : "";
  let groupUrl = props.group_picture_public_id
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_25,h_25,r_max,c_fill,g_auto,f_png/${props?.group_picture_version}/${props?.group_picture_public_id}`
    : "";
  let postUrl = post.post_picture_public_id
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_300,h_300,c_fill_pad,g_auto,f_jpg/${post?.post_picture_version}/${post?.post_picture_public_id}`
    : "";
  let postPicture = post.post_picture_version ? (
    <PostPicture src={postUrl} alt="postPic" />
  ) : (
    <></>
  );
  const pathway = () => {
    if (path !== "/birthdays") {
      push(`/groups/${props?.group_name}`);
    }
  };
  
  const handleCommentToggle = () => {
    commentToggle
      ? setCommentToggle(!commentToggle)
      : setCommentToggle(!commentToggle);
  };
  const handleCommentSubmit = (post_id,user_id,content) => {
    axios.post(`/api/post-comment?post_id=${post_id}&user_id=${user_id}&content=${content}`).then(res=>setComment(res.data)).catch(err=>console.log(err))
  };
  const toggleDisplay = commentToggle ? (
    <CommentToggle onClick={() => handleCommentToggle()}>Hide</CommentToggle>
  ) : (
    <CommentToggle onClick={() => handleCommentToggle()}>
      Leave a comment
    </CommentToggle>
  );
  const commentInput = commentToggle ? (
    <CommentRow>
      <Input onChange={(e) => setContent(e.target.value)} />
      <Submit onClick={() => handleCommentSubmit(post_id,loggedInUser,content)}>Submit</Submit>
    </CommentRow>
  ) : (
    <></>
  );

      const seeMore = path.includes('posts')?<></>:<SeeComments onClick={()=>push(`/posts/${post.group_name}/${post.username}/${post_id}`)}>
      see comments
    </SeeComments>

  const newComment =comment?.comment_content?(
    <Comment comment={comment}/>
  ):( <></>)
  return (
    <Container>
      <PostContainer>
        <HeaderBodyComment>
          <PostHeader>
            <PostRow onClick={() => push(`/profile/${post.user_id}`)}>
              <PostUser src={userUrl} alt="" />
              <UserName>{`${post.first_name} ${post.last_name}`}</UserName>
            </PostRow>
            <Line src={line} alt="" />
            <PostRow onClick={() => pathway()}>
              <GroupName>{props?.group_name}</GroupName>
              <GroupPicture src={groupUrl} alt="" />
            </PostRow>
          </PostHeader>
          <PostBody>
            <PostContent>{post?.post_content}</PostContent>
            {postPicture}
          </PostBody>

          <Row>
            <CreationDate>{post?.creation_date}</CreationDate>
            {toggleDisplay}
          </Row>
          {commentInput}
        </HeaderBodyComment>
{newComment}
{seeMore}
      </PostContainer>

    
    </Container>
  );
};
export default Posts;
