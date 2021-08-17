import React from 'react';
import styled from 'styled-components';
import MappedSingleGroupUsers from './MappedSingleGroupUsers';

let Title = styled.h1`
font-family:'Nunito Black';
`

let Container= styled.aside`
display:flex;
flex-direction: column;
justify-content:flex-start;
background-color:rgb(252, 219, 165);
width:15vw;
height:70vh;
overflow:auto;
box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -10px #000000;
`


const SingleGroupUser =(props)=>{
    let mappedUsers = props.users.map((user,i)=>{
        return <MappedSingleGroupUsers key={i} user={user}/>
    })


return<Container>
    <Title>Hive Members</Title>
    {mappedUsers}
    </Container>
}

export default SingleGroupUser