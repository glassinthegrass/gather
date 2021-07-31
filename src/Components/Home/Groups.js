import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

let GroupsContainer = styled.section`
display:flex;
flex-direction:column;
align-items:center;
margin-right:5px;
margin-left:5px;
font-family:'Nunito Light';
font-size:10px;
`
let GroupName = styled.h6`
color:rgb(88,88,88);
text-decoration:none;
`
const Groups = (props) => {
const {group_name,picture_version,picture_public_id}=props.group

const url =
`https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,c_fill,r_max,g_auto,f_auto/` +
picture_version +
"/" +
picture_public_id;

  return( 

  <GroupsContainer>
  <Link to={`/groups/${group_name}`}>
  <img src={url} alt={'group'}/>
<GroupName>
  {group_name}
  </GroupName>
  </Link>
  </GroupsContainer>
);
};
export default Groups;
