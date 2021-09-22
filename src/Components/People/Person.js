import { useState } from "react";
import styled, { keyframes } from "styled-components";
import PersonGroups from "./PersonGroups";

const Person = (props) => {
  const { handleDelete, toggle, user_id, personUrl } = props;
  const [groupToggle, setGroupToggle] = useState(false);
  const { birthday, creation_date, first_name, last_name, message, person_id } =
    props.person;
  const handleGroupToggle = () => {
    groupToggle ? setGroupToggle(!groupToggle) : setGroupToggle(!groupToggle);
  };
  let edit = toggle ? (
    <Delete onClick={() => handleDelete(person_id, user_id)}>
      delete person
    </Delete>
  ) : (
    <></>
  );
  let groupDisplay = groupToggle ? (
    <GroupToggle onClick={() => handleGroupToggle()}>Close</GroupToggle>
  ) : (
    <GroupToggle onClick={() => handleGroupToggle()}>Groups</GroupToggle>
  );
  return (
    <Container>
      {edit}
      <PersonContainer>
        <Picture src={personUrl} alt="" />

        <Column>
          <Title>Name</Title>
          <Row>
            <Info>
              {first_name} {last_name}
            </Info>
          </Row>
        </Column>
        <Column>
          <Title>Birthday</Title>
          <Info>{birthday}</Info>
        </Column>
        <Column>
          <Title>info</Title>
          <Info>{message}</Info>
        </Column>
        <Column>
          <Title>Creation Date</Title>
          <Info>{creation_date}</Info>
        </Column>
        {groupDisplay}
      </PersonContainer>
      <PersonGroups
        handleGroupDelete={props.handleGroupDelete}
        push={props.push}
        person_id={person_id}
        groupToggle={groupToggle}
      />
    </Container>
  );
};
export default Person;

let Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: rgb(252, 219, 166);
  padding: 5px;
  margin: 3px;
  border-radius: 3px;
`;
let PersonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  text-align: left;
  overflow: hidden;
  width: 100%;
`;
let Row = styled.div`
  display: flex;
  flex-direction: row;
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;
let Picture = styled.img`
  height: 3rem;
  width: 3rem;
`;
let Delete = styled.div`
  width: 100%;
  z-index: 1;
  font-weight: 400;
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: rgb(88, 88, 88);
  height: 2rem;
  cursor: pointer;
  cursor: pointer;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-bottom: 2px;
  border-radius: 3px;
  &:hover {
    background-color: rgb(88, 88, 88, 0.8);
    color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`;
let Title = styled.h6`
  font-size: 10px;
  font-weight: 300;
  @media (max-width: 600px) {
    font-weight: 600;
  }
`;
let Info = styled.p`
  font-size: 16px;
  font-weight: 400;
  @media (max-width: 600px) {
    font-weight: 200;
    font-size: 12px;
  }
`;
let Hover = keyframes`
0%{transform:scale(1);}
50%{transform:scale(1.1);}
100%{transform:scale(1);}
`;
let GroupToggle = styled(Info)`
  cursor: pointer;
  background-color: rgb(88, 88, 88, 0.3);
  padding: 5px;
  background-radius: 3px;
  &:hover {
    animation: ${Hover} 1s infinite ease-in-out;
    background-color: rgb(252, 142, 52, 0.792);
  }
`;
