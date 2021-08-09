import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  height: 5vh;
justify-content:center;
  padding: 10px;
  border-bottom:1px inset rgb(88,88,88,0.7);
background-color: rgb(252, 142, 52, 0.792);
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
`;

export let HeaderSpacer = styled.div`
height:100%;
width:20%;
`
export const Arrow = styled.div`
  float: left;
  padding: 10px;
  font-family:'Nunito Black';
  font-size:30px;
  color:rgb(88,88,88);
  &:hover{
color:yellow;
  }
`;
export const GreetingContainer = styled.section`
display:flex;
justify-content:flex-start;
flex-direction:row;
float:left;
`

export const Greeting= styled.h1`
font-family:'Nunito Light';
`
