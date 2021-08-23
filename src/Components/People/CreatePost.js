import React from "react";
import styled from "styled-components";
let Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 15vh;
  background-color: rgb(88, 88, 88);
`;
let TextInput = styled.textarea`
  width: 90%;
padding:5px;
  outline: none;
  resize: none;
  overflow: auto;
  font-family: "Nunito Light";
  text-align: left;
`;
let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

let Label = styled.label`
  font-family: "Nunito";
  display: flex;
  flex-direction: column;
  align-items:center;
  font-size: 10px;
`;
let PictureInput=styled.div`
width:3rem;
height:3rem;
&:hover{
    background-color:white;
}
`
let Submit = styled.div`
width:20%;
height:96%;
background-color: rgb(252, 219, 166);

`
let Preview = styled.img`
max-width:70%;
`
let Row=styled.div`
display:flex;
justify-content:center;
align-content:center;
align-items:center;
width:20rem;
height:3rem;
`
const CreatePost = (props) => {
  const { birthday,preview,handleSubmit,handleImage,handleContent } = props;


            let picSwitch=preview? <Preview src={preview} alt=''/>:<PictureInput></PictureInput> 
  return (
    <Container>
        
      <HiddenInput
        onChange={(e) => handleImage(e.target.files)}
        type="file"
        id="single"
      />
      <Label htmlFor="single">{picSwitch}</Label>
      <Row>
      <TextInput onChange={(e)=>handleContent(e.target.value)} placeholder="Type your Birthday Message!"></TextInput>
      <Submit onClick={()=>handleSubmit()}>Submit</Submit>
      </Row>
    </Container>
  );
};
export default CreatePost;
