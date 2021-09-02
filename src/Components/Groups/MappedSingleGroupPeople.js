import React from "react";
import {
  Container,
  UserContainer,
  Username,
  Picture,
} from "./MappedSingleGroupUsers";
import styled from "styled-components";

const MappedSingleGroupPeople = (props) => {
  const { person } = props;

  const url = person?.picture_version
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill_pad,g_auto,f_auto,r_max/` +
      person.picture_version +
      "/" +
      person.picture_public_id
    : person?.picture_url;
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
        <Picture src={url} alt="" />
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
