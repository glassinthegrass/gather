import React from "react";
import styled from "styled-components";

let PersonContainer = styled.section`
  width: 100%;
  background-color: rgb(252, 219, 166);
  padding: 5px;
  margin: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  text-align: left;
  overflow: hidden;
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
let Title = styled.h6`
  font-size: 10px;
  font-family: "Nunito Light";
`;
let Info = styled.p`
  font-size: 15px;
  font-family: "Nunito";
`;
const Person = (props) => {
  const {
    birthday,
    creation_date,
    first_name,
    last_name,
    message,
    picture_url,
  } = props.person;

  return (
    <PersonContainer>
      <Picture src={picture_url} alt="" />

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
    </PersonContainer>
  );
};
export default Person;
