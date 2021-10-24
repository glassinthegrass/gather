import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import MappedSingleGroupPeople from "./MappedSingleGroupPeople";
import MappedSingleGroupUsers from "./MappedSingleGroupUsers";

const SingleGroupUser = ({
  push,
  handleAdd,
  loggedInUser,
  users,
  people,
  group,
  handleDelete,
}) => {
//state and other resources
  const [toggle, setToggle] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(true);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState([]);
  const { group_id } = group;

  //handlers

  const handleSearch = (name) => {
    //look for people to add to group
    axios
      .get(`/api/searchpeople?inquery=${name}`)
      .then((res) => setSearch(res.data))
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    //handle edit toggle allowing logged in user that matches same profile viewed to edit profile
    setEdit(!edit);
  };

  //map users
  let mappedUsers = users.map((user, i) => {
    const handleProfileClick = () => {
      push(`/profile/${user.user_id}`);
    };

    return <MappedSingleGroupUsers publicId={user.picture_public_id}handleProfileClick={handleProfileClick} key={i} user={user} />;
  });
//map people
  let mappedPeople = people.map((person, i) => {
    return (
      <MappedSingleGroupPeople
        key={i}
        person={person}
        edit={edit}
        loggedInUser={loggedInUser}
        handleDelete={handleDelete}
        group_id={group_id}
      />
    );
  });
  

  //toggle the search input/ functionality to add people to a group
  let displaySearch = toggleTwo ? (
    <Title onClick={() => setToggleTwo(!toggleTwo)}>Search Your People</Title>
  ) : (
    <React.Fragment>
      <Add onClick={() => setToggleTwo(!toggleTwo)}>Done</Add>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {search.map((item, i) => {
        return (
          <span
            onClick={() => handleAdd(group.group_id, item.person_id)}
            key={i}
          >
            <MappedSingleGroupPeople person={item} />
          </span>
        );
      })}
    </React.Fragment>
  );
//display for editing profile if logged in user matches viewed profile
  let toggleEditDisplay = edit ? (
    <Title onClick={handleEdit}>Done</Title>
  ) : (
    <Title onClick={handleEdit}>Edit</Title>
  );


  const togglePeopleUserDisplay = toggle ? (
  //people display
    <React.Fragment>
      <Title onClick={() => setToggle(!toggle)}>
        Hive People<SubHead>{"(Click Me)"}</SubHead>
      </Title>
      {mappedPeople}
      <React.Fragment>
        {displaySearch}
        {toggleEditDisplay}
      </React.Fragment>
    </React.Fragment>
  ) : (
  //users display
    <React.Fragment>
      <Title onClick={() => setToggle(!toggle)}>
        Hive Members<SubHead>{"(Click Me)"}</SubHead>
      </Title>
      {mappedUsers}
    </React.Fragment>
  );

//final display
  return <Container>{togglePeopleUserDisplay}</Container>;
};

export default SingleGroupUser;

let Title = styled.h1`
  font-weight: 900;
  border: 1px solid rgb(88, 88, 88, 0.5);
  width: 100%;
  height: 30px;
  font-size: 8px;
  background-color: rgb(252, 219, 166);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  z-index: 1;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
  @media (max-width: 600px) {
    font-size: 10px;
    color: rgb(88, 88, 88);
  }
`;

let Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgb(88, 88, 88.05);
  width: 15rem;
  height: 94vh;
  overflow: auto;
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -10px #000000;
`;
let Add = styled.div`
  border: 1px solid rgb(88, 88, 88, 0.5);
  border-radius: 3px;
  width: 100%;
  height: 40px;
  border-left: 0px;
  border-right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nunito", sans-serif;
  font-weight: 300;
  font-size: 20px;
  z-index: 3;
  cursor: pointer;
  background-color: rgb(88, 88, 88);
  color: rgb(252, 142, 52, 0.792);
  &:hover {
    background-color: rgb(252, 219, 166);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`;
let SubHead = styled.p`
  font-size: 8px;
`;
