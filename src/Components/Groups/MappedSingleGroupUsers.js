import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

let Container = styled.section`
  display: flex;
  justify-content: flex-start;
  font-family: "Nunito SemiBold";
  align-items: center;
  padding: 2px;
`;
let UserContainer = styled.div`
  display: flex;
  padding-left:3px;
`;

let Username = styled.p`
  height: 1.5rem;
  display: flex;
  align-items: flex-end;
  width: 11vw;
  overflow: hidden;
  font-size: 10px;
  text-align: left;
  border-top: 1px solid rgb(88, 88, 88, 0.5);
`;
let Picture = styled.img`
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
