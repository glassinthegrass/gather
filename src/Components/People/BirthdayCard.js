import React from "react";
import { Image, Transformation } from "cloudinary-react";
import styled from "styled-components";

const BirthdayCard = (props) => {
  const { birthdays, idx, push } = props;

  return (
    <Container>
      <Info>
        It's {birthdays[idx]?.first_name} {birthdays[idx]?.last_name}'s
        Birthday!
        <br /> Leave a message to brighten their day.
      </Info>
      <PersonPicture>
        <Image publicId={birthdays[idx]?.person_picture_public_id}>
          <Transformation
            background="auto:predominant_gradient_contrast:4"
            width="400"
            height="400"
            crop="pad"
            fetch_format="auto"
          />
          <Transformation
            overlay={{
              fontFamily: "Nunito",
              letterSpacing: 3,
              fontSize: 30,
              fontWeight: "bold",
              text: "Happy Birthday!!!",
            }}
            gravity="south"
            y="20"
            flags="layer_apply"
            color="rgb:F29132"
          />
        </Image>
      </PersonPicture>
      <Row>
        <Info>Person shared from</Info>
        <Column onClick={() => push(`/groups/${birthdays[idx]?.group_name}`)}>
          <GroupPicture>
            <Image publicId={birthdays[idx]?.group_picture_public_id}>
              <Transformation
                width="40"
                height="40"
                crop="thumb"
                gravity="faces"
                fetch_format="auto"
              />
            </Image>
          </GroupPicture>

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
  font-weight: 400;
  font-size: 14px;

  padding: 5px;
`;
let GroupInfo = styled(Info)`
  font-weight: 800;
  font-size: 8px;
  max-width: 40px;
  overflow: hidden;
  position: absolute;
  margin-top: 25px;
  margin-left: 19px;
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
let GroupPicture = styled.div`
  height: 20px;
  width: 20px;
`;
let PersonPicture = styled.div`
  width: 400px;
  height: 400px;
`;
