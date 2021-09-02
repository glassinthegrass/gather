import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export let Container = styled.section`
  display: flex;
  justify-content: flex-start;
  font-family: "Nunito SemiBold";
  align-items: center;
  padding: 2px;
  background-color: rgb(88, 88, 88);
color: rgb(252, 142, 52, 0.792);
&:hover {
  background-color: rgb(252, 219, 166);
  color:rgb(88,88,88);
}
&:active {
  background-color: rgb(252, 142, 52, 0.792);
  color: rgb(88, 88, 88);
}
`;
export let UserContainer = styled.div`
  display: flex;
  justify-content:
  padding-left:5px;
  cursor:pointer;
  width:100%;

`;

export let Username = styled.p`
  height: 1.5rem;
  display: flex;
  align-items: flex-end;
width:100%;
  overflow: hidden;
  font-size: 15px;
  text-align: left;
  border-bottom: 1px solid rgb(252, 219, 166);
  &:hover{
    border-bottom: 1px solid rgb(88,88,88);
  };

`;
export let Picture = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
`;

const MappedSingleGroupUsers = (props) => {
const history = useHistory();
const {push}=history;
const{user_id}=props.user


const handleProfileClick=()=>{
  push(`/profile/${user_id}`)
}
  let userUrl = `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,r_max,c_fill,g_auto,f_auto,q_100/${props.user.picture_version}/${props.user.picture_public_id}`;
  return (
    <Container>
      <UserContainer onClick={handleProfileClick}>
        <Picture src={userUrl} alt="pic" />
        <Username>{props.user.username}</Username>
      </UserContainer>
    </Container>
  );
};

export default MappedSingleGroupUsers;
