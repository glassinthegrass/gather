import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Image,Transformation } from "cloudinary-react";
const Birthdays = (props) => {
  const push = useHistory().push;

  const { birthday } = props


  let check = birthday?.first_name ? (
    <BirthdayContainer onClick={() => push(`/birthdays`)}>
      <LowText>
        It's {birthday?.first_name} {birthday?.last_name}'s birthday!
        
        <Image publicId={birthday?.person_picture_public_id} >
          <Transformation width="50" height='50' crop='fill' gravity='auto' radius='5'fetch_format='auto'/>
        </Image>
      </LowText>
      <HighText>Click to Leave a Birthday Wish!</HighText>
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
  background-color: rgb(252, 219, 165);
  cursor: pointer;
`;

let HighText = styled.p`
  display: flex;

  font-weight: 400;
  font-size: 15px;
  color: rgb(88, 88, 88);
  align-items: flex-end;
  white-space: nowrap;
`;

let LowText = styled.p`
  display: flex;

  font-weight: 400;
  font-size: 15px;
  color: rgb(88, 88, 88);
  white-space: nowrap;
`;

