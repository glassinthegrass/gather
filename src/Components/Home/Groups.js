import React from "react";
import {  useHistory } from "react-router-dom";
import styled from "styled-components";

let GroupsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-contents: center;
  width: 100%;
  margin: 2px;
  padding: 5px;
  font-family: "Nunito Light";
  font-size: 10px;
  border: 1px dotted rgb(88, 88, 88, 0.5);
  border-radius: 10px;
  background-color: rgb(88, 88, 88,0.1);
`;
let GroupName = styled.h6`
  color: rgb(88, 88, 88);
  width: 5rem;
  overflow: hidden;
`;
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
        <img src={url} alt={"group"} />
        <GroupName>{group_name}</GroupName>
      </div>
    </GroupsContainer>
  );
};
export default Groups;
