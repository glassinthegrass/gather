
import styled from "styled-components";

let PersonContainer = styled.section`

  background-color: rgb(252, 219, 166);
  padding: 5px;
  margin: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  text-align: left;
  overflow: hidden;
`;
let Row = styled.div`
  display: flex;
  flex-direction: row;
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;
let Picture = styled.img`
  height: 3rem;
  width: 3rem;
`;
let Delete = styled.div`
z-index: 1;
font-family: "Nunito";
font-size: 20px;
display:flex;
align-items: center;
color: rgb(88,88,88);
height: 2rem;
cursor:pointer;
cursor: pointer;
padding:3px;
&:hover {
  background-color: rgb(88, 88, 88);
  color: rgb(252, 142, 52, 0.792);

}
&:active {
  background-color: rgb(252, 142, 52, 0.792);
  color: rgb(88, 88, 88);
}
`
let Title = styled.h6`
  font-size: 10px;
  font-family: "Nunito Light";
  @media(max-width:500px){
    font-family:'Nunito SemiBold';
    font-size:14px;
  }
`;
let Info = styled.p`
  font-size: 15px;
  font-family: "Nunito";
  @media(max-width:500px){
    font-family:'Nunito Light';
    font-size:12px;
  }
`;
const Person = (props) => {
  const{handleDelete,toggle,user_id,personUrl,person}=props
  const {
    birthday,
    creation_date,
    first_name,
    last_name,
    message,
    picture_url,
    person_id
  } = props.person;

let edit = toggle?<Delete onClick={()=>handleDelete(person_id,user_id)}>delete</Delete>:<></>

  return (
    <PersonContainer>
      <Picture src={personUrl} alt="" />

      <Column>
        <Title>Name</Title>
        <Row>
          <Info>
            {first_name} {last_name}
          </Info>
        </Row>
      </Column>
      <Column>
        <Title>Birthday</Title>
        <Info>{birthday}</Info>
      </Column>
      <Column>
        <Title>info</Title>
        <Info>{message}</Info>
      </Column>
      <Column>
        <Title>Creation Date</Title>
        <Info>{creation_date}</Info>
      </Column>
{edit}
    </PersonContainer>
  );
};
export default Person;
