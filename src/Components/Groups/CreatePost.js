import styled from "styled-components";
import Loading from "../Loading";

const CreatePost = (props) => {
  const { preview, handleImage, handlePostContent, handleSubmit, postContent } =
    props;
  let picSwitch = preview ? (
    <Preview src={preview} alt="" />
  ) : (
    <PictureInput>UPLOAD PHOTO</PictureInput>
  );

  let loadingSwitch = props.loading ? (
    <LoadingBox>
      <Loading />
    </LoadingBox>
  ) : (
    <>
      <Label htmlFor="single">{picSwitch}</Label>
      <Row>
        <TextInput
          value={postContent}
          type="text"
          onChange={(e) => handlePostContent(e.target.value)}
        ></TextInput>
        <Submit onClick={() => handleSubmit()}>Submit</Submit>
      </Row>
      <div>
        <HiddenInput
          type="file"
          id="single"
          onChange={(e) => handleImage(e.target.files)}
        />
      </div>
    </>
  );
  return <Container>{loadingSwitch}</Container>;
};
export default CreatePost;
let Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 1rem;
`;
let TextInput = styled.textarea`
  width: 90%;
  padding: 5px;
  outline: none;
  resize: none;
  overflow: auto;
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
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
font-family: 'Nunito', sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
`;

let PictureInput = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  height: 1.5rem;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
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

let Submit = styled.div`
  width: 25%;
  height: 96%;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -1px;
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
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
  font-family: 'Nunito', sans-serif;
  font-weight: 300;

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

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
