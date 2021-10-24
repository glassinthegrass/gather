import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../../Context/userContext";
import styled from "styled-components";
import Loading from "../Loading";
import GroupCard from "./GroupCard";
import { useHistory } from "react-router";
const AddGroup = (props) => {
  const push= useHistory().push
  const [user] = useContext(userContext);
  const [image, setImage] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState([]);
  const [newGroup, setNewGroup] = useState(null);

  //user image select
  const handleImage = (img) => {
    //set image/preview
    if (img[0]) {
      setImage(img[0]);
      setImgPreview(URL.createObjectURL(img[0]));
    } else {
      // clear the images/preview
      setImage(img[0]);
      setImgPreview(null);
    }
  };

  //eliminate spaces, needs better functionality
  const handleGroupNameInput = (groupName) => {
    let newGroup = "";
    //eliminate spaces
    for (let i = 0; i < groupName.length; i++) {
      if (groupName[i] !== " ") {
        newGroup += groupName[i];
      }
    }
    //search for existing matching groups
    if (groupName.length > 3) {
      axios
        .get(`/api/groups?searchQuery=${newGroup}`)
        .then((res) => {
          setSearch(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearch([]);
    }
    //setGroup name if shorter than 20 characters
    //need to add length error for user
    if (groupName.length < 20) {
      setGroupName(newGroup);
    }
  };
  //set subject input
  const handleSubjectInput = (sub) => {
    setSubject(sub);
  };

  //submit new groupinfo/picture
  const handleGroupSubmit = () => {
    setLoadingToggle(true);
    let fileData = new FormData();
    fileData.append("image", image);
    let config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `/api/groups?user_id=${user.user_id}&group_name=${groupName}&subject=${subject}`,
        fileData,
        config
      )
      .then((res) => {
        setLoadingToggle(false);
        setNewGroup(res.data);
      })
      .catch((err) => console.log(err));
  };

  //jsx
  //change submit button based on input values
  let submit =
    search.length === 0 && groupName.length >= 3 && imgPreview !== null ? (
      <Submit onClick={() => handleGroupSubmit()}>Click to Submit!</Submit>
    ) : (
      <Submit>Finish to Submit</Submit>
    );

  //main display for page, with loading logic
  let display = (
    <React.Fragment>
      <div>
        <Header>Group Subject</Header>
        <Input
          onChange={(e) => handleSubjectInput(e.target.value)}
          placeholder="tv-sports-youtube"
        />
      </div>
      <Column>
        <HiddenInput
          onChange={(e) => handleImage(e.target.files)}
          type="file"
          id="single"
        />
        <Label htmlFor="single">
          {loadingToggle ? (
            <LoadingBox>
              <Loading />
            </LoadingBox>
          ) : imgPreview ? (
            <PreviewImage src={imgPreview} alt="" />
          ) : (
            <PreviewDiv>Upload Hive Photo</PreviewDiv>
          )}
        </Label>
      </Column>
      {submit}
    </React.Fragment>
  );
  //if the search comes back with a matching group name, display this instead of full display
  let existingGroupDisplaySwitch = search[0]?.group_name ? (
    <React.Fragment>
      <Header>a hive by that name already exists</Header>
      <GroupCard push={push} group={search[0]} />
    </React.Fragment>
  ) : (
    <React.Fragment>{display}</React.Fragment>
  );
  //shown once group is created/replaces everything, main display included. prevents going back.
  let newGroupView = newGroup ? (
    <React.Fragment>
      <PageHeader>Hive Created</PageHeader>
      <GroupCard group={newGroup} />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <PageHeader>create a hive</PageHeader>
      <div>
        <Header>Group Name</Header>
        <Input
          value={groupName}
          placeholder="type here"
          onChange={(e) => handleGroupNameInput(e.target.value)}
        />
      </div>
      {existingGroupDisplaySwitch}
    </React.Fragment>
  );
  return (
    <Container>
      <Box>{newGroupView}</Box>
    </Container>
  );
};

export default AddGroup;

let Submit = styled.div`
  width: 18rem;
  height: 2rem;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  margin-left: -1px;
  font-family: Nunito, Roboto, sans-serif;
  font-weight: 200;
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
let Column = styled.div`
  display: flex;
  flex-direction: column;
`;
let PageHeader = styled.h1`
  font-size: 50px;
  font-family: Nunito, Roboto, sans-serif;
  font-weight: 900;
  padding: 2rem;
`;
let Header = styled.h6`
  font-family: Nunito, Roboto, sans-serif;
  font-weight: 400;
`;
let Label = styled.label`
  font-family: Nunito, Roboto, sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
`;
let Input = styled.input`
  padding: 5px;
  border-radius: 10px 10px 10px 10px;
  width: 12rem;
  margin: 5px;
`;

let Container = styled.section`
  width: 100vw;
  min-height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${(props) => (props.theme.dark ? props.theme.backgroundColor : "")};
  @media (max-width: 500px) {
    justify-content: flex-start;
  }
`;
let Box = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-around;
  align-items: center;
  width: 20rem;
  padding: 30px;
  min-height: 50vh;
  background-color: rgb(252, 219, 166);
  border: 1px solid rbg(88, 88, 88);
  border-radius: 10px 10px 10px 10px;
  @media (max-width: 500px) {
    width: 80%;
    background-color: rgb(252, 219, 166, 0);
  }
`;
let PreviewImage = styled.img`
  min-height: 10vh;
  min-width: 35vw;
  max-height: 25vh;

  margin-top: 2rem;
  border: 1px dotted rgb(88, 88, 88);
  border-radius: 10px 10px 10px 10px;

  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.7);
    color: rgb(88, 88, 88);
  }
  @media (max-width: 500px) {
    max-height: 40vh;
    max-width: 95vw;
  }
`;
let PreviewDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
  width: 18rem;
  margin-top: 1.5rem;
  border: 1px dotted rgb(88, 88, 88);
  border-radius: 10px 10px 10px 10px;
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.7);
    color: rgb(88, 88, 88);
  }
  @media (max-width: 500px) {
    width: 100vw;
    height: 35vh;
  }
`;

let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
let LoadingBox = styled.div`
  width: 5rem;
  height: 5rem;
`;
