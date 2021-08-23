import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import MappedSingleGroupPeople from './MappedSingleGroupPeople';
import MappedSingleGroupUsers from './MappedSingleGroupUsers';

let Title = styled.h1`
font-family:'Nunito Black';
`

let Container= styled.aside`
display:flex;
flex-direction: column;
justify-content:flex-start;
background-color:rgb(252, 219, 165);
width:25vw;

overflow:auto;
box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -10px #000000;
`
let Add = styled.div`
width:2rem;
height:2rem;
background-color:rgb(88,88,88,0.5);
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
&:hover{
    background-color:rgb(88,88,88);
}
`


const SingleGroupUser =(props)=>{
    const [toggle,setToggle]=useState(false);
    const [toggleTwo,setToggleTwo]=useState(true);
    const [search,setSearch]=useState([]);


    let mappedUsers =props.users? props.users.map((user,i)=>{
        return <MappedSingleGroupUsers key={i} user={user}/>
    }):<></>;

    let mappedPeople = props.people?props.people.map((person,i)=>{
        return <MappedSingleGroupPeople  key={i} person={person}/>
    }):<></>;
    const handleSearch =(name)=>{
        axios.get(`/api/searchpeople?inquery=${name}`).then(res=>setSearch(res.data)).catch(err=>console.log(err));
    }

    let mappedSearch = search ? search.map((item,i)=>{
        return <div onClick={()=>props.handleAdd(props.group.group_id,item.person_id)}key={i}>
            <MappedSingleGroupPeople person={item} />
        </div>
        
    }):<></>;

const searchDisplay = <><Add onClick={()=>setToggleTwo(!toggleTwo)}>Search</Add><input onChange={(e)=>handleSearch(e.target.value)}/>{mappedSearch}</>;

    const toggleSearch = toggleTwo ? <Add onClick={()=>setToggleTwo(!toggleTwo)}>+</Add>:searchDisplay;
    const toggledPeopleUsers =toggle ? <><Title onClick={()=>setToggle(!toggle)}>Hive Friends</Title>{mappedPeople}{toggleSearch}</>:<><Title onClick={()=>setToggle(!toggle)}>Hive Members</Title>{mappedUsers}</>;

return<Container>

    
{toggledPeopleUsers}
    </Container>
}

export default SingleGroupUser