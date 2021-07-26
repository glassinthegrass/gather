import styled from "styled-components";

export const Window = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 90vh;
  min-width:80%;
  font-family:'Nunito Black'
`;
export const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;
  min-width: 200px;
  max-width: 300px;
  min-height: 150px;
  max-height: 80vh;
  background-color: rgb(252, 219, 166);
  border:1px solid rgb(88, 88, 88);
  border-bottom:0px;
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
  border-radius: 10px 10px 0px 0px;

`;
export const Input = styled.input`
  width: 8rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1vh;
  margin: 1vh;
margin-left:10%;
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
  border-radius: 10px 10px 10px 10px;
  font-size:10px;
`;
export const Submit = styled.h1`
  width: 6rem;
  height: 1rem;
  padding: 1vh;
  align-items: center;
  margin: 5%;
  margin-left:20%;
  font-family:'Nunito Light';
  border: 1px solid rgb(88, 88, 88);
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
  &:hover {
    background-color: rgb(88,88,88);
color:rgb(252, 142, 52, 0.792);
  };
  &:active{
    background-color:rgb(252,142,52,0.792);
    color:rgb(88,88,88);
  };
`;
export const LoginToggle = styled.div`
  width: 100%;
  height: 30px;
  z-index: 1;
  font-size: 8px;
  background-color: rgb(252, 219, 166);
  margin-bottom: -10px;
  border: 1px solid rgb(88, 88, 88);
  border-top: 0px solid rgb(88,88,88);
  border-right:1.5px dotted rgb(88,88,88);
  border-radius: 0px 0px 0px 10px;
  display: flex;
  justify-content: center;
  align-items:center;
  font-family:'Nunito Light';
  font-size:20px;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  &:hover {
    background-color: rgb(88,88,88);
color:rgb(252, 142, 52, 0.792);
  };
  &:active{
    background-color:rgb(252,142,52,0.792);
    color:rgb(88,88,88);
  };
`;
export const RegisterToggle = styled(LoginToggle)`
border-radius: 0px 0px 10px 0px;
border-left:0.5px dotted rgb(88,88,88);
border-right:1px solid rgb(88,88,88);
`;

export const ToggleBox = styled.section`
  display: flex;
  flex-direction: row;
`;

export let BusyBee = styled.img`

`