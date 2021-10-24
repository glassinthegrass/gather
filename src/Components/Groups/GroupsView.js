import axios from "axios";
import React, { useEffect, useState } from "react";
import bee from "../../Public/Gather_Line_with_Bee.png";
import { fadeIn } from "../Home/Home";
import styled from "styled-components";
import MappedGroupsView from "./MappedGroupsView";

const GroupsView = ({
  filter,
  push,
  allGroups,
  user,
  loggedInUser,
  handleFilter,
  handleGroupSearch,
}) => {
  const [groups, setGroups] = useState([]);
  //re-used Groupsview after the fact required some rejiggering to get it to function with different starting inputs on the pages. needs clean up but works.
  useEffect(() => {
    setGroups(allGroups);
  }, [allGroups]);
  //handle group delete.
  const handleDelete = (user, group_id, filter) => {
    axios
      .delete(
        `/api/delete-group?group_id=${group_id}&user=${user}&filter=${filter}`
      )
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  };
  //handle user leaving group membership
  const handleLeave = (user, group_id, loggedInUser, filter) => {
    axios
      .delete(
        `/api/groups?user=${user}&group_id=${group_id}&filter=${filter}&loggedInUser=${loggedInUser}`
      )
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  };
  //handle user joinging group
  const handleJoin = (group_id, user, loggedInUser, filter) => {
    axios
      .post(
        `/api/groups/member?group_id=${group_id}&user=${user}&filter=${filter}&loggedInUser=${loggedInUser}`
      )
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  };

  //map of mappedGroupsView. honestly my naming could be better.
  const MappedGroups = groups ? (
    groups.map((group, i) => {
      return (
        <MappedGroupsView
        push={push}
          filter={filter}
          handleJoin={handleJoin}
          handleDelete={handleDelete}
          handleLeave={handleLeave}
          user={user}
          loggedInUser={loggedInUser}
          group={group}
          key={i}
        />
      );
    })
  ) : (
    <React.Fragment></React.Fragment>
  );

  return (
    <Container>
      <MapWrap>
        <Row>
          <Toggles onClick={handleFilter}>all groups</Toggles>{" "}
          <Toggles onClick={handleFilter}>followed groups</Toggles>
        </Row>
        <Input
          placeholder="Search for a hive"
          onChange={(e) => handleGroupSearch(e.target.value)}
        />
        <MapWrapTwo>
          <AddGroup onClick={() => push("/add-new-group")}>
            <AddGroupText id="text">+</AddGroupText>
          </AddGroup>

          {MappedGroups}
        </MapWrapTwo>
      </MapWrap>
      <Bee src={bee} alt="" />
      <Spacer></Spacer>
    </Container>
  );
};

export default GroupsView;

let Bee = styled.img`
  max-height: 90vh;
  position: fixed;
  z-index: 0;
  margin-left: 5rem;
  margin-top: -3rem;
  transform: rotate(80deg);
  transform: scaleX(-1);
`;
let Row = styled.div`
  display: flex;
  width: 100%;
`;
let AddGroup = styled.div`
border:3px solid rgb(88,88,88,0.7);
border-radius:25px 25px 25px 25px;
background-color:rgb(252, 142, 52, 0.792);
padding:10px;
font-weight: 400;
margin:10px;
margin-left:20px;
margin-right:20px;
display:flex;
justify-content:center;
align-items:center;
align-content:center;
width:150px;
height:150px;
&:hover{
  border:3px solid rgb(88,88,88);
  }
  &:
  &:hover #text{
    color:rgb(88,88,88,0.7);
  }
  &:active{
    border:3px solid rgb(88,88,88,0.1);
    background-color:rgb(88,88,88,0.7);
  }
  &:active #text{
    color:rgb(252,142,52,0.792);
  }
  @media(max-width:600px){
    width:100px;
    height:100px;
    font-size:10px;
    margin-left:9px;
    margin-right:9px;
  }
  @media(min-width:900px){
    width:200px;
    height:200px;
    margin-left:23px;
    margin-right:23px;
  }
  `;
let AddGroupText = styled.h1`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 14em;
  color: rgb(88, 88, 88, 0.3);
  margin-top: -2.5rem;
  width: 7rem;
  height: 7rem;
  &:hover {
    margin-top: -2.6rem;
    color: rgb(88, 88, 88, 0.7);
    transform: scale(1.1);
  }
  @media (min-width: 900px) {
    width: 10rem;
    height: 10rem;
    font-size: 18em;
  }
  @media (max-width: 600px) {
    width: 5rem;
    height: 5rem;
    font-size: 12em;
  }
`;
let Toggles = styled.div`
  border: 1px solid rgb(88, 88, 88, 0.5);
  width: 50%;
  height: 30px;

  display: flex;
  justify-content: center;
  margin: 5px;
  align-items: center;
  border-radius: 10px;

  font-weight: 300;
  z-index: 4;
  font-size: 20px;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  ${(props) =>
    props.theme.dark
      ? props.theme.solidBackgroundColor
      : "background-color: rgb(252, 219, 166)"};
  cursor: pointer;
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
  @media (max-width: 600px) {
    font-size: 15px;

    font-weight: 600;
  }
`;
let Spacer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  font-weight: 600;
`;
let Container = styled.section`
  display: flex;
  flex-direction: column;
  z-index: 1;
  align-items: center;
  align-content: center;
  width: 100vw;
  min-height: 90vh;
`;
let MapWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  min-height: 90%;
  border: 3px solid rgb(88, 88, 88, 0.5);
  border-radius: 10px 10px 10px 10px;
  flex-wrap: wrap;
  z-index: 1;
`;
let MapWrapTwo = styled(MapWrap)`
  border: 0px;
  align-items: flex-start;
  animation: ${fadeIn} 0.5s linear;
`;
let Input = styled.input`
  width: 30%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
