import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Image,Transformation } from "cloudinary-react";
const Birthdays = (props) => {
  const push = useHistory().push;

  const { birthday } = props


  let check = birthday?.first_name ? (
    <BirthdayContainer onClick={() => push(`/birthdays`)}>
      <Text>
        It's {birthday?.first_name} {birthday?.last_name}'s birthday!
      </Text>
      
        <Image publicId={birthday?.person_picture_public_id} >
          <Transformation width="50" height='50' crop='fill' gravity='auto' radius='5'fetch_format='auto'/>
        </Image>
      <Text>Click to Leave a Birthday Wish!</Text>
    </BirthdayContainer>
  ) : (
    <></>
  );
  return <>{check}</>;
};
export default Birthdays;
let BirthdayContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${props=>props.theme.dark?props.theme.backgroundColor:'background-color: rgb(88,88,88,0.1)'};
  cursor: pointer;
`;

let Text = styled.p`
  display: flex;
  font-weight: 600;
  font-size: 15px;
  align-items: center;
  white-space: nowrap;
padding-left:10px;
padding-right:10px;
${props=>props.theme.color+';'+props.theme.fontShadow};
`;



