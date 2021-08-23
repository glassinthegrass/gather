import React from "react";
import styled from "styled-components";
let Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
width:100%;
  background-color: blue;
`;
let Info = styled.p`
  font-family: "Nunito";
  font-size: 14px;
`;
let GroupInfo = styled(Info)`
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
`;
let GroupPicture = styled.img`
  height: 20px;
  width: 20px;
`;
let PersonPicture = styled.img`

`;
const BirthdayCard = (props) => {
    const{birthday}=props
    let personUrl = `https://res.cloudinary.com/glassinthegrass/image/upload/w_300,h_200,c_fill,g_face,f_auto/${birthday?.person_picture_version}/${birthday?.person_picture_public_id}`;
    let groupUrl = `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,c_fill_pad,g_auto,f_auto/${birthday?.group_picture_version}/${birthday?.group_picture_public_id}`;

  return (
    <Container>
      <Info>
        It's {birthday?.first_name} {birthday?.last_name}'s
        Birthday! Leave a message to brighten their day.
      </Info>
      <PersonPicture src={personUrl} alt="" />
      <Row>
        <Info>Person shared from</Info>
        <Column>
          <GroupPicture src={groupUrl} alt="" />
          <GroupInfo>{birthday?.group_name}</GroupInfo>
        </Column>
      </Row>
    </Container>
  );
};
export default BirthdayCard;
