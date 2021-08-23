import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

let MenuWindow = styled.aside`
  min-width: 15rem;
  min-height: 40vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px 15px 15px 15px;
  background-color: rgb(88, 88, 88);
  position: absolute;
  z-index: 3;
  margin-right: -50vw;
`;
let LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  min-width: 80%;
  height: 40vh;
`;

const Menu = (props) => {
  console.log(props);
  const { user_id } = props.user;
  return (
    <MenuWindow>
      <LinkContainer>
        <Link to={`/profile/${user_id}`}>Profile</Link>
        <Link to={`/all-groups`}>Groups</Link>
        <Link to={`/people`}>People</Link>
        <Link to="/home">Home</Link>
        <Link to="/birthdays">Birthdays</Link>
        <p onClick={props.logoutUser}>Logout</p>
      </LinkContainer>
    </MenuWindow>
  );
};

export default Menu;
