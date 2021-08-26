import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import MappedSingleGroupPeople from './MappedSingleGroupPeople';
import MappedSingleGroupUsers from './MappedSingleGroupUsers';

let Title = styled.h1`
font-family:'Nunito Black';
border: 1px solid rgb(88, 88, 88, 0.5);
  width: 100%;
  height: 30px;
  font-size: 8px;
  background-color: rgb(252, 219, 166);
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
cursor:pointer;
  font-size: 20px;
  z-index:1;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`

let Container= styled.aside`
display:flex;
flex-direction: column;
justify-content:flex-start;
background-color:rgb(88,88,88.05);
width:15rem;
overflow:auto;
box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -10px #000000;

`
let Add = styled.div`
border: 1px solid rgb(88, 88, 88, 0.5);
border-radius:3px;
width: 100%;
height: 40px;
border-left:0px;
border-right:0px;
display: flex;
justify-content: center;
align-items: center;
font-family: "Nunito Light";
font-size: 20px;
z-index:3;
cursor:pointer;
background-color: rgb(88, 88, 88);
color: rgb(252, 142, 52, 0.792);
&:hover {
  background-color: rgb(252, 219, 166);
}
&:active {
  background-color: rgb(252, 142, 52, 0.792);
  color: rgb(88, 88, 88);
}
`
let SubHead = styled.p`
font-size:8px;
`

const SingleGroupUser =(props)=>{
    const [toggle,setToggle]=useState(false);
    const [toggleTwo,setToggleTwo]=useState(true);
    const [search,setSearch]=useState([]);


    let mappedUsers =props.users? props.users.map((user,i)=>{
        return <MappedSingleGroupUsers key={i} user={user} />
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

const searchDisplay = <><Add onClick={()=>setToggleTwo(!toggleTwo)}>Done</Add><input onChange={(e)=>handleSearch(e.target.value)}/>{mappedSearch}</>;

    const toggleSearch = toggleTwo ? <Add onClick={()=>setToggleTwo(!toggleTwo)}>Search Your People </Add>:searchDisplay;
    const toggledPeopleUsers =toggle ? <><Title onClick={()=>setToggle(!toggle)}>Hive People<SubHead>{'(Click Me)'}</SubHead></Title>{mappedPeople}{toggleSearch}</>:<><Title onClick={()=>setToggle(!toggle)}>Hive Members<SubHead>{'(Click Me)'}</SubHead></Title>{mappedUsers}</>;

return<Container>

    
{toggledPeopleUsers}
    </Container>
}

export default SingleGroupUser