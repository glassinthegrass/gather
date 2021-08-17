import React from "react";
import styled from "styled-components";
let Container = styled.section`
display:flex;
justify-content:center;

`
let PostRow= styled.div`
display:flex;
justify-content:flex-start;
align-items:flex-end;
`
let PostContainer = styled.section`
  max-height: 60vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 5px;
width:22rem;
border-radius:0px 0px 10px 10px;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
`;

let PostHeader = styled.div`
  display: flex;
  justify-content:space-between;
  background-color: rgb(252, 219, 165);
  border-radius: 10px 10px 0px 0px;
  align-items: flex-end;
  border: 1px solid rgb(88, 88, 88, 0.2);
`;
let PostBody = styled.div`
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  padding: 5px;
  background-color: white;
  border-left: 1px solid rgb(88, 88, 88, 0.2);
  border-right: 1px solid rgb(88, 88, 88, 0.2);
  border-bottom: 1px solid rgb(88, 88, 88, 0.2);
`;

let PostContent = styled.p`
  display: flex;
  justify-content: flex-start;
text-align:left;
  background-color: white;
  max-width: 80%;
  margin-left: 10%;
  font-family:'Nunito Light';
`;
let PostUser = styled.img`

  border:1px solid rgb(88,88,88,0.5);
  border-radius:50%;
  margin:5px;
`;

let PostPicture = styled.img`
  background-color: white;
  width:90%;
`;
let UserName = styled.p`
  font-family: "Nunito SemiBold";
  margin-bottom: 8px;
  margin-left: -5px;
`;
let GroupPicture=styled.img`
width:25px;
height:25px;
border:1px solid rgb(88,88,88,0.5);
border-radius:50%;
margin:5px;
`
let GroupName = styled(UserName)`
font-family:'Nunito Light';
font-size:10px;
margin-right:-10px;
margin-bottom:-1px;
`
const Posts = (props) => {
  const { post } = props;
  let userUrl = `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,r_max,c_fill,g_auto,f_auto/${post.user_picture_version}/${post.user_picture_public_id}`;
  let postUrl = `https://res.cloudinary.com/glassinthegrass/image/upload/w_300,h_300,c_fill_pad,g_auto,f_auto/${post.post_picture_version}/${post.post_picture_public_id}`;
  let groupUrl = `https://res.cloudinary.com/glassinthegrass/image/upload/w_25,h_25,r_max,c_fill_pad,g_auto,f_auto/${props.group_picture_version}/${props.group_picture_public_id}`;
  let postPicture = post.post_picture_version ? (
    <PostPicture src={postUrl} alt="postPic" />
  ) : (
    <></>
  );

  return (
    <Container>
    <PostContainer>
      <PostHeader>
        <PostRow>
        <PostUser src={userUrl} alt="user" />
        <UserName>{`${post.first_name} ${post.last_name}`}</UserName>
        </PostRow>
        <PostRow>
<GroupName>{props.group_name}</GroupName>
        <GroupPicture src={groupUrl} alt=''/>
        </PostRow>
      </PostHeader>
      <PostBody>
        <PostContent>{post.post_content}</PostContent>
        {postPicture}
      </PostBody>
    </PostContainer>
    </Container>


  );
};
export default Posts;
