import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Groups = (props) => {
  const history = useHistory();
  const { push } = history;
  const { group_name, picture_version, picture_public_id } = props.group;

  const url =
    `https://res.cloudinary.com/glassinthegrass/image/upload/w_60,h_60,c_fill,r_max,g_auto,f_auto/` +
    picture_version +
    "/" +
    picture_public_id;

  return (
    <GroupsContainer>
      <div onClick={() => push(`/groups/${group_name}`)}>
        <GroupImage className="groupname" src={url} alt={"group"} />
        <GroupName className="groupname">{group_name}</GroupName>
      </div>
    </GroupsContainer>
  );
};
export default Groups;

let GroupsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-contents: center;
  margin: 2px;
  padding: 5px;
  font-family: "Nunito Light";
  font-size: 10px;
  border: 1px dotted rgb(88, 88, 88, 0.5);
  border-radius: 10px;
  background-color: rgb(88, 88, 88, 0.1);
  cursor: pointer;
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
    font-family: "Nunito SemiBold";
    color: rgb(88, 88, 88);
  }
`;
let GroupName = styled.h6`
  color: rgb(88, 88, 88);
  width: 5rem;
  overflow: hidden;
  border-radius: 50px;
  padding: 1px;
  border: 3px solid rgb(252, 219, 165);
`;
let GroupImage = styled.img`
  border-radius: 50%;
  padding: 3px;
  border: 3px solid rgb(252, 219, 165);
`;
