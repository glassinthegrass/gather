import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  height: 2.5rem;
justify-content:center;

  padding: 10px;
  border-bottom:1px inset rgb(88,88,88,0.7);
background-color: rgb(252, 142, 52, 0.792);
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
  z-index:3;
@media(max-width:600px){
 display:none; 
}
`;

export let HeaderSpacer = styled.div`
height:100%;
width:20%;
z-index:1;
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
@media(min-width: 501px){
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
`
export let Holding = styled.div`
&:hover .profileMenu{
  display:flex;
flex-direction:column;
align-items:center;
justify-content:space-around;
}
`

export let Profile = styled.div`
display:none;
position:absolute;

margin-left:-6rem;
box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
width:10rem;
background-color:rgb(88,88,88);
border-radius:10px;
cursor:auto;
z-index:3;
`

export let ProfileLink =styled.div`
border: 1px solid rgb(88, 88, 88, 0.5);
border-radius:3px;
width: 100%;
height: 40px;
border-left:0px;
border-right:0px;
display: flex;
justify-content: center;
align-items: center;
font-family: "Nunito Light";
font-size: 20px;
z-index:3;
cursor:pointer;
background-color: rgb(88, 88, 88);
color: rgb(252, 142, 52, 0.792);
&:hover {
  background-color: rgb(252, 219, 166);
}
&:active {
  background-color: rgb(252, 142, 52, 0.792);
  color: rgb(88, 88, 88);
}
`
export let ProfilePic = styled.img`
height:30px;
width:30px;
z-index:3;
`
export let LogoContainer = styled.div`
width:5rem;
`
export let Gather = styled.h1`
position:absolute;
font-size:30px;
color:rgb(88,88,88);
font-family:'Nunito Black';
margin-top:-1.4rem;
margin-left:2.5rem;
`

export let Logo = styled.img`
width:3rem;
height:3rem;
margin-top:-0.5rem;
margin-right:0.5rem;
`
export let Hide =styled.div`
display:flex;
@media(max-width:500px){
  display:none;
}
`