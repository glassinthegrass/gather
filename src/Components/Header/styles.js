import styled, { keyframes } from "styled-components";

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  height: 2.5rem;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px inset rgb(88, 88, 88, 0.7);
  background-color: rgb(242, 145, 50);
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
  z-index: 3;
  @media (max-width: 600px) {
    padding-top: 12px;
    height: 1rem;
  }
`;

export let HeaderSpacer = styled.div`
  height: 100%;
  width: 20%;
  z-index: 1;
`;

export const Arrow = styled.div`
  float: left;
  padding: 10px;
  font-family: "Nunito Black";
  font-size: 30px;
  color: rgb(88, 88, 88);
  &:hover {
    color: yellow;
  }
`;
export const GreetingContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  float: left;
`;

export const Greeting = styled.h1`
  font-family: "Nunito";
`;
let Hover = keyframes`
0%{transform:scale(0.9);}
50%{transform:scale(1.1);}
100%{transform:scale(0.9);}
`;
export let HeaderIcons = styled.img`
  height: 40px;
  height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 2px;
  margin-top: -5px;
  margin-right: 2px;

  &:hover {
    animation: ${Hover} 1.3s infinite ease-in-out;
  }
`;

export let Holding = styled.div`
  &:hover .profileMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;
let show = keyframes`
0%{margin-left:2rem;opacity:0;}
50%{opacity:0;}
100%{opacity:1;}
`;
export let ProfileMenuBox = styled.div``;
export let Profile = styled.div`
  display: none;
  position: absolute;
  margin-top: -1rem;
  margin-left: -6rem;
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
  width: 10rem;
  background-color: rgb(88, 88, 88);
  border-radius: 10px;
  cursor: auto;
  z-index: 3;
  animation: ${show} 0.3s ease-in;
  animation-iteration-count: 1;
`;

export let ProfileLink = styled.div`
  border: 1px solid rgb(88, 88, 88, 0.5);
  border-radius: 3px;
  width: 100%;
  height: 40px;
  border-left: 0px;
  border-right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nunito Light";
  font-size: 20px;
  z-index: 3;
  cursor: pointer;
  background-color: rgb(88, 88, 88);
  color: rgb(252, 142, 52, 0.792);
  &:hover {
    background-color: rgb(252, 219, 166);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`;
export let ProfilePic = styled.img`
  height: 30px;
  width: 30px;
  z-index: 3;
`;
export let LogoContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 75vw;
  @media (max-width: 600px) {
    margin-right: 65vw;
    margin-top: -10px;
  }
`;
export let Gather = styled.h1`
  position: absolute;
  font-size: 30px;
  color: rgb(88, 88, 88);
  font-family: "Nunito Black";
  margin-top: -1.4rem;
  margin-left: 2.5rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

export let Logo = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: -0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  @media (max-width: 600px) {
    height: 2rem;
    width: 2rem;
    margin-top: -1px;
  }
`;

export let Hide = styled.div`
  display: flex;
  @media (max-width: 600px) {
    display: none;
  }
`;

export let GatherHolder = styled.div`
  width: 2rem;
  height: 2.3rem;
  position: absolute;
  padding-right: 10px;
  margin-left: -10px;
  cursor: pointer;
  &:hover .miniGather {
    display: flex;
  }
  @media (min-width: 601px) {
    display: none;
  }
`;
let slide = keyframes`
0%{margin-left:-30px;opacity:0;}
70%{opacity:0;}
100%{opacity:1;}
`;
export let MiniGather = styled(Gather)`
  display: none;
  font-size: 20px;
  margin-top: 16px;

  animation: ${slide} 0.36s ease-in;
  animation-iteration-count: 1;
`;
