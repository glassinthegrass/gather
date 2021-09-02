import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

let BirthdayContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(252, 219, 165);
  cursor:pointer;
`;

let HighText = styled.p`
  display: flex;
  font-family: "Nunito";
  font-size: 15px;
  color: rgb(88, 88, 88);
  align-items: flex-end;
  white-space: nowrap;
`;

let LowText = styled.p`
  display: flex;
  font-family: "Nunito";
  font-size: 15px;
  color: rgb(88, 88, 88);
  white-space: nowrap;
`;
let Image = styled.img`
width:2.5rem;
height:2.5rem;
`
const Birthdays = (props) => {
  const push = useHistory().push;
  const [personUrl, setPersonUrl] = useState("");
  const { birthday } = props;

  useEffect(() => {
    if (birthday?.person_picture_public_id) {
      setPersonUrl(
        `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,c_fill,g_auto,f_auto/${birthday?.person_picture_version}/${birthday?.person_picture_public_id}`
      );
    }else{
      setPersonUrl(birthday?.person_picture_url)
    }
  }, [birthday]);

  let check = birthday?.first_name ? (
    <BirthdayContainer onClick={() => push(`/birthdays`)}>
      <LowText>
        It's {birthday?.first_name} {birthday?.last_name}'s birthday!
        <Image src={personUrl} alt="" />
      </LowText>
        <HighText>Click to Leave a Birthday Wish!</HighText>
    </BirthdayContainer>
  ) : (
    <></>
  );
  return <>{check}</>;
};
export default Birthdays;
