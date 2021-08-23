import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  height: 2rem;
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

export let HeaderMenuIcon = styled.img`
width:30px;
height:30px;
padding-top:5px;
padding-bottom:5px;
padding-left:10px;
padding-right:10px;
margin-left:2px;
margin-top:-13px;
margin-right:2px;
@media(min-width: 601px){
  display:none;
}
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
font-family:'Nunito';
`
export let HeaderIcons = styled.img`
width:30px;
height:30px;
padding-top:5px;
padding-bottom:5px;
padding-left:10px;
padding-right:10px;
margin-left:2px;
margin-top:-5px;
margin-right:2px;
@media(max-width: 600px){
  display:none;
}
`