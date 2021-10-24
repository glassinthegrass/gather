import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { userContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import { fadeIn } from "../Home/Home";
import styled from "styled-components";
import CreatePerson from "./CreatePerson";
import Person from "./Person";

const People = (props) => {
  const [toggle, setToggle] = useState(false);
  const push = useHistory().push;
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user]=useContext(userContext)
  const { user_id, isLoggedIn } = user;

  useEffect(() => {
    axios
      .get(`/api/people?user_id=${user_id}`)
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  }, [user_id]);
  const handleToggle = () => {
    !toggle ? setToggle(!toggle) : setToggle(!toggle);
  };
  const handleDelete = (person_id, user_id) => {
    axios
      .delete(`/api/people?person_id=${person_id}&user_id=${user_id}`)
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  };

  const handleAddPerson = (persons) => {
    setPeople([...people, persons]);
  };
  useEffect(() => {
    if (isLoggedIn === false) {
      push("/");
    }
  }, [isLoggedIn, push]);
  const handleLoading = (newLoading) => {
    setLoading(newLoading);
  };
  const handleGroupDelete = (group_id, person_id) => {
    axios
      .put(`/api/groups/${group_id}/person/${person_id}`)
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  };
  let mappedPeople = people[0] ? (
    people.map((person, i) => {

      return (
        <Person
          handleGroupDelete={handleGroupDelete}
          push={push}
          toggle={toggle}
          handleDelete={handleDelete}
          user_id={user_id}
          person={person}
          key={i}
        />
      );
    })
  ) : (
    <Title>
      <Ol>
        Hmmm. Doesn't look like there's anyone here
        <Li>Step One: add a person</Li>
        <Li>Step Two: add that person to a hive</Li>
        <Li>Step Three: Those hives are notified on that person's birthday!</Li>
        <Li>Step Four: Profit</Li>
      </Ol>
    </Title>
  );
  let editLoading = loading ? (
    <></>
  ) : (
    <Edit onClick={handleToggle}>edit people</Edit>
  );
  return (
    <Container>
      <Directions></Directions>
      <PeopleContainer>
        <CreatePerson
          handleLoading={handleLoading}
          loading={loading}
          creator={user_id}
          setPeople={handleAddPerson}
        />
        {editLoading}
        <PeopleColumn>{mappedPeople}</PeopleColumn>
      </PeopleContainer>
    </Container>
  );
};

export default People;

let Container = styled.section`
  width: 100vw;
  min-height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${fadeIn} 0.5s linear;
  ${props=>props.theme.dark?props.theme.backgroundColor:''};
`;
let PeopleColumn = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
`;
let PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  border: 1px dotted rgb(88, 88, 88, 0.5);

  @media (min-width: 780px) {
    width: 70vw;
  }
`;
let Directions = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;

let Edit = styled.p`
  width: 98%;
  font-weight: 400;
  text-align: right;
  padding-right: 1rem;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: rgb(88, 88, 88, 0.7);
    color: white;
  }
`;
let Title = styled.div`
  width: 100%;

  background-color: rgb(88, 88, 88, 0.7);
  color: white;
`;
let Ol = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 900;
`;
let Li = styled.li`
font-weight: 300;
  padding: 1px;
`;
