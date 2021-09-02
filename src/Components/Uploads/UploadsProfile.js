import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const UploadsProfile = (props) => {
  const push = useHistory().push;
  const { user_id } = props.user;
  const [response, setResponse] = useState(null);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [preview, setPreview] = useState(null);
  const { getUser } = props;
  const [image, setImage] = useState([]);

  const handleFile = (img) => {
    if (img[0]) {
      setImage(img[0]);
      setResponse(null);
      setPreview(URL.createObjectURL(img[0]));
    } else {
      setImage([]);
      setResponse(null);
      setPreview(null);
    }
  };
  const handlePhoto = () => {
    setLoadingToggle(true);
    let fileData = new FormData();
    fileData.append("image", image);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`/api/images/${user_id}`, fileData, config)
      .then(function (res) {
        setResponse(res.data);
        setLoadingToggle(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (response) {
      getUser(user_id);
    }
  }, [user_id, response, getUser]);

  let picSwitch = preview ? (
    response ? (
      <Preview src={response} alt="" />
    ) : (
      <Preview src={preview} alt="" />
    )
  ) : (
    <PictureInput>
      {loadingToggle ? <Loading /> : "SELECT PROFILE PHOTO"}
    </PictureInput>
  );

  let buttonSwitch = response ? (
    <>
      <Submit onClick={() => push(`/profile/${user_id}`)}>
        To Your Profile
      </Submit>
      <Submit onClick={() => push("/home")}>Home</Submit>
    </>
  ) : (
    <Submit onClick={() => handlePhoto()}>Submit</Submit>
  );
  let loadingSwitch = loadingToggle ? (
    <LoadingBox>
      <Loading />
    </LoadingBox>
  ) : (
    buttonSwitch
  );
  return (
    <Containter>
      <UploadContainer>
        <HiddenInput
          type="file"
          id="single"
          onChange={(e) => handleFile(e.target.files)}
        />
        <Label htmlFor="single">{picSwitch}</Label>

        {loadingSwitch}
      </UploadContainer>
    </Containter>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { getUser })(UploadsProfile);
let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

let Submit = styled.div`
  width: 10rem;
  height: 3rem;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -1px;
  font-family: "Nunito Light";
  padding: 5px;
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
  @media (max-width: 600px) {
    width: 80%;
  }
`;
let Label = styled.label`
  font-family: "Nunito";
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
`;
let Containter = styled.section`
  width: 100vw;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
let UploadContainer = styled.div`
  min-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
let PictureInput = styled.div`
  width: 80vw;
  height: 30rem;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nunito SemiBold";
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
  @media (max-width: 600px) {
    width: 100vw;
  }
`;
let Preview = styled.img`
  height: 30rem;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 10px 10px;
  font-family: "Nunito Light";
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  background-color: white;
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;
let LoadingBox = styled.div`
  width: 5rem;
  height: 5rem;
`;
