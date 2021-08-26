import React from 'react';
import {Container,UserContainer,Username,Picture} from './MappedSingleGroupUsers'



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