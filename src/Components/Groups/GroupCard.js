import React from "react";
import { Image, Transformation } from "cloudinary-react";
import styled from "styled-components";
//component shows newly created group in AddGroup Component
const GroupCard = ({ group, push }) => (
  <Container>
    <DarkRow>
      <Column>
        <Row>
          <Image publicId={group.picture_public_id}>
            <Transformation height="30" width="30" crop="fill" format="auto" />
          </Image>
          <Text>{group.group_name}</Text>
        </Row>
        <LinkText onClick={() => push(`/groups/${group.group_name}`)}>
          {"Click to visit your new hive ->"}
        </LinkText>
      </Column>
      <Text>{group.subject}</Text>
    </DarkRow>
  </Container>
);
export default GroupCard;

let Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
let DarkRow = styled(Row)`
  background-color: rgb(88, 88, 88, 0.3);
  border-radius: 1px 1px 1px 1px;
  justify-content: space-between;
`;

let Container = styled.section`
  padding: 15px;
  width: 18rem;
  height: 4.5rem;
  background-color: rgb(88, 88, 88, 0.5);
  border: 1px dotted rgb(88, 88, 88);
  border-radius: 10px;
`;
let Text = styled.p`
  padding: 10px;

  font-weight: 400;
  font-size: 12px;
  text-align: left;
`;
let LinkText = styled(Text)`
  text-align: right;
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 45%;
`;
