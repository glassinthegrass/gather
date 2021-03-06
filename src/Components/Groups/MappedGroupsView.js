import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Transformation } from "cloudinary-react";
import styled from "styled-components";

const MappedGroupsView = ({
  handleJoin,
  handleLeave,
  handleDelete,
  filter,
  user,
  loggedInUser,
  push,
  group,
}) => {
  const [toggle, setToggle] = useState(false);
  const [member, setMember] = useState(false);
  const { group_name, group_id, picture_public_id } = group;
  const { user_id } = user;
  let id = loggedInUser.user_id;

  //check if logged in user is member of group
  useEffect(() => {
    axios
      .get(`/api/member/groups?group_id=${group_id}&user_id=${id}`)
      .then((res) => setMember(res.data))
      .catch((err) => console.log(err));
  }, [group_id, id]);
  //toggle group options box
  const handleToggle = () => {
    !toggle ? setToggle(!toggle) : setToggle(!toggle);
  };
  //link to group
  const handleGroupClick = () => {
    push(`/groups/${group_name}`);
  };
  //leave group
  const handleLeaveClick = () => {
    handleLeave(user_id, group_id, id, filter);
    setMember(false);
    setToggle(false);
  };

  //delete group if admin
  const handleDeleteClick = () => {
    handleDelete(user_id, group_id, filter);
    setToggle(false);
    setToggle(false);
  };
  //join group
  const handleJoinClick = () => {
    handleJoin(group_id, user_id, id, filter);
    setMember(user_id);
    setToggle(false);
  };
  //display if group member and toggle window
  let optionsToggleWindow = toggle ? (
    member !== false ? (
      <React.Fragment>
        <OptionBox onClick={() => handleLeaveClick()}>Leave Hive</OptionBox>
        {member !== false && member.admin === true ? (
          <OptionBox onClick={() => handleDeleteClick()}>Delete Hive</OptionBox>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </React.Fragment>
    ) : (
      <OptionBox onClick={handleJoinClick}>Join Hive</OptionBox>
    )
  ) : (
    <React.Fragment></React.Fragment>
  );
//display put together
  let display = (
    <React.Fragment>
      <Options>
        <h1 onClick={handleToggle}>...</h1>
        {optionsToggleWindow}
      </Options>
      <GroupImage
        onClick={() => handleGroupClick()}
        publicId={picture_public_id}
      >
        <Transformation
          width="150"
          height="150"
          crop="fill"
          gravity="auto"
          fetch_format="auto"
        />
      </GroupImage>
      <GroupName>{group_name}</GroupName>
    </React.Fragment>
  );

//return value
  return <Container>{display}</Container>;
};

export default MappedGroupsView;

let Container = styled.section`
  display: flex;
  justify-content: center;
  width: 13.5rem;

  @media (max-width: 600px) {
    width: 9rem;
  }
  @media (min-width: 900px) {
    width: 17rem;
  }
`;
let GroupImage = styled(Image)`
  border: 3px solid rgb(88, 88, 88, 0.7);
  border-radius: 25px 25px 25px 25px;
  background-color: rgb(252, 142, 52, 0.792);
  padding: 10px;
  margin: 10px;
  width: 150px;
  height: 150px;
  cursor: pointer;
  &:hover {
    border: 3px solid rgb(88, 88, 88);
  }
  @media (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 900px) {
    width: 200px;
    height: 200px;
  }
`;

let GroupName = styled.h6`
  position: absolute;
  margin-top: 3rem;
  z-index: 1;

  font-weight: 900;
  font-size: 18px;
  color: rgb(247, 242, 234);
  text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
  cursor: pointer;
  text-wrap: wrap;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (min-width: 900px) {
    font-size: 22px;
  }
`;
let Options = styled.div`

  font-weight: 900;
  position: absolute;
  z-index: 2;

  margin-left: 110px;
  margin-top: 5px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  font-size: 35px;
  color: rgb(252, 142, 52, 0.792);
  padding: 5px;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  cursor:context-menu;

  @media(max-width:600px){
    font-size:26px;
margin-bottom:-10px;
    margin-left:70px;

  @media(min-width:900px){
    margin-left:185px;
    margin-top:15px;
    font-size:30px;
    
  }
`;
let OptionBox = styled.div`
  padding: 3px;
  height: 1rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -50px;
  border: 1px solid white;
  font-size: 10px;
  background-color: rgb(88, 88, 88, 0.7);
  cursor: pointer;

  &:hover {
    background-color: rgb(252, 219, 166);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`;
