import { Image,Transformation } from "cloudinary-react";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Group = (props) => {
  const [toggle, setToggle] = useState(false);
  const { group, push, handleDelete } = props;

  const handleToggle = () => {
    toggle ? setToggle(!toggle) : setToggle(!toggle);
  };
  const handleDeleteClick = () => {
    handleDelete(group.group_id, props.person_id);
    setToggle(false);
  };
  const toggleDisplay = toggle ? (
    <OptionBox onClick={() => handleDeleteClick()}>remove group</OptionBox>
  ) : (
    <></>
  );
  return (
    <MapContainer>
      <Row onClick={() => push(`groups/${group.group_name}`)}>

        <Image publicId={group?.picture_public_id}><Transformation height='30' width='30' background='auto' border='1px_solid_gray' gravity='auto'  crop='fill_pad' radius='3' fetch_format='png'/></Image>
        <Name>{group.group_name}</Name>
      </Row>
      <Options className="options" onClick={() => handleToggle()}>
        ...
        {toggleDisplay}
      </Options>
    </MapContainer>
  );
};
export default Group;

let Hover = keyframes`
0%{transform:scale(1.2);}
100%{transform:scale(1);}
`;
let MapContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  margin: 2px;
  width: 30%;
  background-color: rgb(88, 88, 88, 0.25);
  border-radius: 3px;
  animation: ${Hover} 0.1s 1 linear;
  &:hover {
    background-color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: white;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

let Name = styled.p`
  display: flex;
  align-items: center;
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
let Options = styled.div`
font-weight: 900;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 26px;
  color: rgb(252, 142, 52, 0.792);
  padding: 2.5px;
  padding-bottom: 10px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  cursor: context-menu;
  height: 1rem;
  width: 2rem;
  border-radius: 50%;

  &:active {
    color: white;
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
let OptionBox = styled.div`
  padding: 8px 16px 8px 16px;
  height: 1rem;
  width: 4.5rem;
  position: absolute;
  display: flex;
  color: rgb(252, 142, 52, 0.792);
  align-items: center;
  justify-content: center;
  margin-bottom: -15px;
  margin-left: -120px;
  border: 1px solid white;
  font-size: 10px;
  font-weight: 400;
  background-color: rgb(252, 219, 166);
  cursor: pointer;

  &:hover {
    background-color: rgb(88, 88, 88);
  }
  &:active {
    background-color: white;
    color: rgb(88, 88, 88);
  }
`;
let Row = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
`;
