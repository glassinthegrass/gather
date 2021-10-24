import React from "react";
import { Image, Transformation } from "cloudinary-react";
import styled from "styled-components";
import { Container, UserContainer, Username } from "./MappedSingleGroupUsers";

const MappedSingleGroupPeople = ({
  group_id,
  person,
  edit,
  loggedInUser,
  handleDelete,
}) => {
  //people added to group/ needs work. group page needs work especially
  let creatorDeleteToggle =
    person?.creator === loggedInUser && edit ? (
      <Delete onClick={() => handleDelete(group_id, person.person_id)}>
        x
      </Delete>
    ) : (
      <React.Fragment></React.Fragment>
    );

  return (
    <Container>
      {creatorDeleteToggle}
      <UserContainer>
        <Image publicId={person?.picture_public_id}>
          <Transformation
            width="31"
            height="31"
            crop="fill_pad"
            gravity="auto"
            fetch_format="png"
            radius="max"
          />
        </Image>
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
