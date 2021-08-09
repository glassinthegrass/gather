import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";


let SectionContainer = styled.section`
display:flex;
flex-direction:column;
margin-top:2rem;
width:40%;
height:90%;
padding:10px;
background-color:rgb(252, 142, 52, 0.792);
box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
border-radius:10px 10px 10px 10px;
`

let TextInput =styled.textarea`
overflow-wrap: break-word;
word-break:break-all;
height:80px;
`
const CreatePost = (props) => {

  const [image, setImage] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [preview, setPreview] = useState("");

  const handleImage = (img) => {
    setImage(img[0]);
    setPreview(URL.createObjectURL(img[0]));
  };
  const handlePostContent = (e) => {
    setPostContent(e);
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
        `/api/groupPosts/${props.group.group_id}/user/${props.user.user_id}?post_content=${postContent}`,
        fileData,
        config
      )
      .then((res) => props.handleAddPost(res.data))
      .catch((err) => console.log(err));
    setPreview('');
    setPostContent('');
  };
  return (

    <SectionContainer>
      <TextInput type='text' value={postContent} onChange={(e) => handlePostContent(e.target.value)}></TextInput>
      <div>
        <label htmlFor="single">{">"}</label>
        <input
          type="file"
          id="single"
          onChange={(e) => handleImage(e.target.files)}
        />
        <button onClick={() => handleSubmit()}>Submit your post!</button>
      </div>
      <img src={preview} alt=""></img>
    </SectionContainer>
    
  );
};
export default CreatePost;
