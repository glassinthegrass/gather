import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import GroupCard from "./GroupCard";

let Column = styled.div`
  display: flex;
  flex-direction: column;
`;
let PageHeader = styled.h1`
  font-size: 50px;
  font-family: "Nunito Black";
  padding: 3rem;
`;
let Header = styled.h6`
  font-family: "Nunito";
`;
let Label = styled.label`
  font-family: "Nunito";
  display:flex;
  flex-direction:column;
`;
let Input = styled.input`
  padding: 5px;
  border-radius: 10px 10px 10px 10px;
  width: 12rem;
  margin: 5px;
`;

let Container = styled.section`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
`;

let PreviewImage = styled.img`
  min-height: 5vh;
  max-height:25vh;
  padding: 10px;
  border: 1px dotted rgb(88, 88, 88);
  border-radius: 10px 10px 10px 10px;
`;

let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const AddGroup = (props) => {
  const [image, setImage] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [group_name, setGroup_Name] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState([]);
  const [newGroup, setNewGroup] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleImage = (img) => {
    setImage(img[0]);
    setImgPreview(URL.createObjectURL(img[0]));
  };
  const handleGroupNameInput = (groupName) => {
    setGroup_Name(groupName);
    axios
      .get(`/api/groups?searchQuery=${groupName}`)
      .then((res) => {
        setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubjectInput = (sub) => {
    setSubject(sub);
  };

  const handleGroupSubmit = () => {
    let fileData = new FormData();
    fileData.append("image", image);
    let config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `/api/groups?user_id=${props.user.user_id}&group_name=${group_name}&subject=${subject}`,
        fileData,
        config
      )
      .then((res) => setNewGroup(res.data))
      .catch((err) => console.log(err));
  };
  let submit =
    search.length === 0 && group_name.length >= 3 ? (
      <div onClick={() => handleGroupSubmit()}>Click to Submit!</div>
    ) : (
      <></>
    );

  let display = (
    <>
      {console.log(newGroup)}
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
        <Label htmlFor="single">Select a Group Cover Photo
        <PreviewImage src={imgPreview} alt="" />
        </Label>
      </Column>
      {submit}
    </>
  );
  let existingGroup = search[0]?.group_name ? (
    <>
      <Header>a hive by that name already exists</Header>
      <GroupCard group={search[0]} />
    </>
  ) : (
    <>{display}</>
  );
  let newGroupView = newGroup ? (<>
<PageHeader>Hive Created</PageHeader>
    <GroupCard group={newGroup} />
    </>
  ) : (
    <>
      <PageHeader>create a hive</PageHeader>

      <div>
        <Header>Group Name</Header>
        <Input
          placeholder="type here"
          onChange={(e) => handleGroupNameInput(e.target.value)}
        />
      </div>
      {existingGroup}
    </>
  );
  return (
    <Container>
      <Box>{newGroupView}</Box>
    </Container>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(AddGroup);
