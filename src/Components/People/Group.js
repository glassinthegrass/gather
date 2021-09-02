import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Group = (props) => {
  const [toggle, setToggle] = useState(false);

  const { group, push, handleDelete } = props;
  let url = group.picture_public_id
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,g_auto,c_fill_pad,r_5,f_png/` +
      group.picture_version +
      "/" +
      group.picture_public_id
    : "";
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
        <Image src={url} alt="" />
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

let Image = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 3px;
  background-color: white;
`;
let Name = styled.p`
  display: flex;
  align-items: center;
  padding: 5px;
  font-family: "Nunito";
  font-size: 15px;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
let Options = styled.div`
  font-family: "Nunito Black";
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
