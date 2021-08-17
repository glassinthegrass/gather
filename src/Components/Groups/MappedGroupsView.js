import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
let Container = styled.section`
  display: flex;
  justify-content: center;

  width: 12rem;
`;
let GroupImage = styled.img`
  border: 3px solid rgb(88, 88, 88, 0.7);
  border-radius: 25px 25px 25px 25px;
  background-color: rgb(252, 142, 52, 0.792);
  padding: 10px;
  margin: 10px;
  width: 125px;
  height: 125px;
  &:hover {
    border: 3px solid rgb(88, 88, 88);
  }
`;

let Options = styled.div`
  font-family: "Nunito Black";
  position: absolute;
  z-index: 2;
  margin-left: 90px;
  margin-top: 10px;
  font-size: 20px;
  color: rgb(252, 142, 52, 0.792);
  padding: 10px;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  &: hover {
    font-size: 25px;
  }
`;
let GroupName = styled.h6`
  position: absolute;
  margin-top: 3rem;
  z-index: 1;
  font-family: "Nunito Black";
  color: rgb(247, 242, 234);
  text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
`;
let OptionBox = styled.div`
  padding: 3px;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -50px;
  border: 1px solid white;
  font-size: 10px;
  background-color: rgb(88, 88, 88, 0.7);
`;
const MappedGroupsView = (props) => {
  const [toggle, setToggle] = useState(false);
  const [member, setMember] = useState(false);
  const push = useHistory().push;
  const { group_name, group_id, picture_version, picture_public_id } =
    props.group;
  const { user, loggedInUser } = props;

  const { user_id } = user;
  const url =
    `https://res.cloudinary.com/glassinthegrass/image/upload/w_125,h_125,c_fill_pad,g_auto,f_auto/` +
    picture_version +
    "/" +
    picture_public_id;

  useEffect(() => {
    axios
      .get(
        `/api/member/groups?group_id=${group_id}&user_id=${loggedInUser.user_id}`
      )
      .then((res) => setMember(res.data))
      .catch((err) => console.log(err));
  }, [group_id, loggedInUser.user_id]);

  const handleGroupClick = () => {
    push(`/groups/${group_name}`);
  };
  const handleToggle = () => {
    !toggle ? setToggle(!toggle) : setToggle(!toggle);
  };

  const handleLeaveClick = () => {
    props.handleLeave(
      user.user_id,
      group_id,
      loggedInUser.user_id,
      props.filter
    );
    setMember(false);
    setToggle(false);
  };
  const handleDeleteClick = () => {
    props.handleDelete(user.user_id, group_id, props.filter);
    setToggle(false);
    setToggle(false);
  };
  const handleJoinClick = () => {
    props.handleJoin(
      group_id,
      user.user_id,
      loggedInUser.user_id,
      props.filter
    );
    setMember(user_id);
    setToggle(false)
  };
  let isAdmin =
    member !== false && member.admin === true ? (
      <OptionBox onClick={() => handleDeleteClick()}>Delete Hive</OptionBox>
    ) : (
      <></>
    );

  let optionsToggleWindow = toggle ? (
    member !== false ? (
      <>
        <OptionBox onClick={() => handleLeaveClick()}>Leave Hive</OptionBox>
        {isAdmin}
      </>
    ) : (
      <OptionBox onClick={handleJoinClick}>Join Hive</OptionBox>
    )
  ) : (
    <></>
  );

  return (
    <Container>
      <Options>
        <h1 onClick={handleToggle}>...</h1>
        {optionsToggleWindow}
      </Options>

      <GroupImage onClick={() => handleGroupClick()} src={url} alt="" />
      <GroupName>{group_name}</GroupName>
    </Container>
  );
};

export default MappedGroupsView;
