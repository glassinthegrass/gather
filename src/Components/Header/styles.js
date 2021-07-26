import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  height: 5vh;
  justify-content:flex-end;
  padding: 10px;
  background-color: rgb(252, 142, 52, 0.792);
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
`;
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
`

export const Greeting= styled.h1`
font-family:'Nunito Light';
`