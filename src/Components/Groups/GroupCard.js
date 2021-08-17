import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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
  font-family: "Nunito";
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
const GroupCard = (props) => {
  const history = useHistory(),
    { push } = history;
  let groupURL =
    `https://res.cloudinary.com/glassinthegrass/image/upload/w_35,h_35,c_fill_pad,r_5,g_auto,f_auto/` +
    props.group.picture_version +
    "/" +
    props.group.picture_public_id;
  console.log(props);
  return (
    <Container>
      <DarkRow>
        <Column>
          <Row>
            <img src={groupURL} alt="" />
            <Text>{props.group.group_name}</Text>
          </Row>
          <LinkText onClick={() => push(`/groups/${props.group.group_name}`)}>
            {"see here -->"}
          </LinkText>
        </Column>
        <Text>{props.group.subject}</Text>
      </DarkRow>
    </Container>
  );
};
export default GroupCard;
