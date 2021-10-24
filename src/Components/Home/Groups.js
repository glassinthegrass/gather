import React from "react";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";

const Groups = ({ group, push }) => (
  <GroupsContainer onClick={() => push(`/groups/${group.group_name}`)}>
    <GroupImage>
      <Image publicId={group.picture_public_id}>
        <Transformation
          width="60"
          height="60"
          gravity="auto"
          radius="max"
          fetch_format="png"
          crop="fill"
        />
      </Image>
    </GroupImage>
    <GroupName className="groupname">{group.group_name}</GroupName>
  </GroupsContainer>
);
export default Groups;

let GroupsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px;
  padding: 5px;
  font-weight: 300;
  font-size: 10px;
  border: 1px dotted rgb(88, 88, 88, 0.5);
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.dark ? "rgb(88,88,88,0.5)" : "rgb(88,88,88,0.2)"};
  &:hover {
    background-color: rgb(88, 88, 88, 0.3);
    color: rgb(252, 142, 52, 0.792);
  }
  &:hover .groupname {
    color: rgb(88, 88, 88);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
  &:active .groupname {
    font-weight: 600;
    color: rgb(88, 88, 88);
  }
`;
let GroupName = styled.h6`
  ${(props) => props.theme.color};
  font-weight: ${(props) => (props.theme.dark ? "500" : "300")};
  width: 5rem;
  overflow: hidden;
  border-radius: 50px;
  padding: 1px;
  border: 3px solid
    ${(props) => (props.theme.dark ? "rgb(88,88,88)" : "rgb(252, 219, 165)")};
`;
let GroupImage = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  padding: 3px;
  border: 3px solid
    ${(props) => (props.theme.dark ? "rgb(88,88,88)" : "rgb(252, 219, 165)")};
`;
