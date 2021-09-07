import React from "react";
import styled from "styled-components";

const BirthdayCard = (props) => {
  const { birthdays, idx, push } = props;
  let personUrl = birthdays[idx]?.person_picture_public_id
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_400,h_400,c_pad,f_auto/co_rgb:ffff00,l_text:Nunito_20_bold_letter_spacing_2:!!Happy Birthday!!/fl_layer_apply,g_south,y_20/${birthdays[idx]?.person_picture_version}/${birthdays[idx]?.person_picture_public_id}`
    : birthdays[idx]?.person_picture_url;
  let groupUrl = `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,c_fill_pad,g_auto,f_auto/${birthdays[idx]?.group_picture_version}/${birthdays[idx]?.group_picture_public_id}`;

  return (
    <Container>
      <Info>
        It's {birthdays[idx]?.first_name} {birthdays[idx]?.last_name}'s
        Birthday!
        <br /> Leave a message to brighten their day.
      </Info>
      <PersonPicture src={personUrl} alt="" />
      <Row>
        <Info>Person shared from</Info>
        <Column onClick={() => push(`/groups/${birthdays[idx]?.group_name}`)}>
          <GroupPicture src={groupUrl} alt="" />
          <GroupInfo>{birthdays[idx]?.group_name}</GroupInfo>
        </Column>
      </Row>
    </Container>
  );
};
export default BirthdayCard;

let Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 30vh;
  background-color: rgb(252, 219, 165);
  padding: 1rem;
  border-radius: 10px 10px 10px 10px;
`;
let Info = styled.p`
  font-family: "Nunito",sans-serif;
  font-weight: 400;
  font-size: 14px;
  padding: 5px;
`;
let GroupInfo = styled(Info)`
font-weight: 400;
  font-size: 8px;
`;
let Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  cursor: pointer;
`;
let GroupPicture = styled.img`
  height: 20px;
  width: 20px;
`;
let PersonPicture = styled.img`
  width: 400px;
  height: 400px;
`;
