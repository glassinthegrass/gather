import React from 'react';
import styled from 'styled-components';
let Container = styled.section`
  display: flex;
  justify-content: flex-start;
  font-family: "Nunito SemiBold";
  align-items: center;
  padding: 2px;
`;
let UserContainer = styled.div`
  display: flex;
  padding-left:3px;
`;

let Username = styled.p`
  height: 1.5rem;
  display: flex;
  align-items: flex-end;
  width: 11vw;
  overflow: hidden;
  font-size: 10px;
  text-align: left;
  border-top: 1px solid rgb(88, 88, 88, 0.5);
`;
let Picture = styled.img`
  border-radius: 50%;
max-height:10px;
  box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
`;


const MappedSingleGroupPeople=(props)=>{
    const {person}=props
    console.log(props)

    const url =person.picture_version?
    `https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill_pad,g_auto,f_auto,r_max/` +
    person.picture_version +
    "/" +
    person.picture_public_id:person.picture_url

   return <Container>
        <UserContainer>
    <Picture src={url} alt=''/>
    <Username>{person.first_name} {person.last_name}</Username>
    
        </UserContainer>
    </Container>
    

}
export default MappedSingleGroupPeople