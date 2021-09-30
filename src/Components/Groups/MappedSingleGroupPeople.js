import React from "react";
import {
  Container,
  UserContainer,
  Username,

} from "./MappedSingleGroupUsers";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";

const MappedSingleGroupPeople = (props) => {
  const { person } = props;
  let editCheck =
    props.person?.creator === props?.loggedInUser && props?.edit ? (
      <Delete
        onClick={() => props.handleDelete(props?.group_id, person.person_id)}
      >
        x
      </Delete>
    ) : (
      <></>
    );

  return (
    <Container>
      {editCheck}
      <UserContainer>
        <Image publicId={person?.picture_public_id}><Transformation width='31' height='31' crop='fill_pad' gravity='auto' fetch_format='png' radius='max'/></Image>
        <Username>
          {person.first_name} {person.last_name}
        </Username>
      </UserContainer>
    </Container>
  );
};
export default MappedSingleGroupPeople;
let Delete = styled(Username)`
  width: 1rem;
  height: 1rem;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgb(242, 145, 50);
  }
  &:active {
    background-color: rgb(88, 88, 88);
    color: rgb(242, 145, 50);
  }
`;
