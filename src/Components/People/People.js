import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CreatePerson from './CreatePerson';
import Person from './Person';
let Container = styled.section`
width:100vw;
min-height:90vh;
display:flex;
align-items:center;
flex-direction:column;
`
let PeopleContainer=styled.div`
width:80%;
display:flex;
flex-direction:column;
align-items:center;
padding:1rem;
margin:5px;
border:1px dotted rgb(88,88,88,0.5);
`
let Directions = styled.div`
height:1rem;
width:80%;
display:flex;
justify-content:space-between;
`

const People = (props)=>{


const push = useHistory().push
    const [people,setPeople]=useState([])
    const {user_id,isLoggedIn}=props.user
    useEffect(()=>{
        axios.get(`/api/people?user_id=${user_id}`).then(res =>setPeople(res.data)).catch(err=>console.log(err))
    },[user_id])

    let mappedPeople = people?people.map((person,i)=>{
       return  <Person person={person} key={i}/>
    }):<></>;

    const handleAddPerson =(persons)=>{
        setPeople(persons);
    }
    useEffect(()=>{
        if(isLoggedIn===false){
        push('/')
        }
          },[isLoggedIn,push])

    return<Container>
        <Directions><div onClick={()=>push(`/profile/${user_id}`)}>{'<--Profile'}</div><div></div></Directions>
        <PeopleContainer>
        <CreatePerson creator={user_id} setPeople={handleAddPerson}/>
        {mappedPeople}
        </PeopleContainer>
        </Container>
}
const mapStateToProps=(reduxState)=>{
    return reduxState.userReducer
}
export default connect(mapStateToProps)(People)