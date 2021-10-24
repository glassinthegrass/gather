import React from "react";
import logo from "../Public/BeeLogoFull.png";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <HexContainer>
      <Hex src={logo} alt="" />
    </HexContainer>
  );
};
export default Loading;

let spin = keyframes`
0% {
    transform: rotate(0deg) scale(0.8);}
    50%{transform:roatate(180deg) scale(1);}
  100%{
    transform: rotate(360deg) scale(0.8);}
`;
let colorChange = keyframes`
0%{background-color:blue;transform:scale(0.9);}
10%{background-color:red;}
20%{background-color:yellow;}
30%{background-color:green;}
40%{background-color:purple;}
50%{background-color:orange;transform:scale(1.1);}
60%{background-color:blueviolet;}
70%{background-color:yellow;}
80%{background-color:gold;}
90%{background-color:darkgoldenrod;}
100%{background-color:rgb(88,88,88);transform:scale(0.9);}
`;
let Hex = styled.img`
  width: 100%;
  height: 100%;
  animation: ${spin} 1s infinite linear;
`;
let HexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  animation: ${colorChange} 1s infinite linear;
`;
