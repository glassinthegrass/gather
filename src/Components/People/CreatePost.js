import React from "react";
import styled from "styled-components";
import Loading from "../Loading";
let Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 93%;
  padding: 1rem;
  border-top: 2px dotted rgb(88, 88, 88, 0.7);
  background-color: rgb(88, 88, 88, 0.2);
  border-radius: 10px;
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
  align-items: center;
  font-size: 10px;
`;

let PictureInput = styled.div`
  width: 15rem;
  height: 1.5rem;

  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Nunito Light";

  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  background-color: rgb(252, 219, 166);
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.5);
    color: rgb(88, 88, 88);
  }
`;

let TextInput = styled.textarea`
  width: 90%;
  padding: 5px;
  outline: none;
  resize: none;
  overflow: auto;
  font-family: "Nunito Light";
  text-align: left;
`;
let Submit = styled.div`
  width: 20%;
  height: 96%;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -1px;
  border-radius: 0px 10px 10px 0px;
  font-family: "Nunito Light";

  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  background-color: rgb(252, 219, 166);
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.7);
    color: rgb(88, 88, 88);
  }
`;
let Preview = styled.img`
  height: 10rem;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0px 0px;
  font-family: "Nunito Light";

  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  background-color: rgb(88, 88, 88);
`;
let Row = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 20rem;
  height: 3rem;
`;
let LoadingBox = styled.div`
  width: 3rem;
  height: 3rem;
`;
const CreatePost = (props) => {
  const { preview, handleSubmit, loading, handleImage, handleContent } = props;

  let picSwitch = preview ? (
    <Preview src={preview} alt="" />
  ) : (
    <PictureInput>UPLOAD PHOTO</PictureInput>
  );
  let loadingSwitch = loading ? (
    <LoadingBox>
      <Loading />
    </LoadingBox>
  ) : (<>
    <Label htmlFor="single">{picSwitch}</Label>
      <Row>
        <TextInput
          onChange={(e) => handleContent(e.target.value)}
          placeholder="Type your Birthday Message!"
        ></TextInput>
        <Submit onClick={() => handleSubmit()}>Submit</Submit>
      </Row></>
  );
  return (
    <Container>
      <HiddenInput
        onChange={(e) => handleImage(e.target.files)}
        type="file"
        id="single"
      />
      {loadingSwitch}
    </Container>
  );
};
export default CreatePost;
