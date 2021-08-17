import axios from "axios";
import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import styled from "styled-components";
import MappedGroupsView from "./MappedGroupsView";

let Row = styled.div`
display:flex;
width:50rem;

`
let AddGroup =styled.div`
border:3px solid rgb(88,88,88,0.7);
border-radius:25px 25px 25px 25px;
background-color:rgb(252, 142, 52, 0.792);
padding:10px;
margin:10px;
margin-left:21px;
margin-right:20px;
display:flex;
justify-content:center;
align-items:center;
align-content:center;
width:125px;
height:125px;
&:hover{
  border:3px solid rgb(88,88,88);
  }
  &:
  &:hover #text{
    color:rgb(88,88,88,0.7);
  }
  &:active{
    border:3px solid rgb(88,88,88,0.1);
    background-color:rgb(88,88,88,0.7);
  }
  &:active #text{
    color:rgb(252,142,52,0.792);
  }
  `
let AddGroupText = styled.h1`
display:flex;
justify-content:center;
align-content:center;
align-items:center;
font-family:'Nunito Black';
font-size:10em;
color:rgb(88,88,88,0.3);
margin-top:-8px;
margin-left:3px;
width:100%;
height:100%;
&:hover{
  color:rgb(88,88,88,0.7)
  }
`
let Toggles = styled.div`
border:1px solid rgb(88,88,88,0.5);
width: 50%;
height: 30px;
font-size: 8px;
background-color: rgb(252, 219, 166);
display: flex;
justify-content: center;
margin:5px;
align-items:center;
border-radius:10px;
font-family:'Nunito Light';
font-size:20px;
box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
&:hover {
  background-color: rgb(88,88,88);
color:rgb(252, 142, 52, 0.792);
};
&:active{
  background-color:rgb(252,142,52,0.792);
  color:rgb(88,88,88);
};
`
let Spacer= styled.div`
width:100%;
height:3rem;
display:flex;
justify-content:center;
align-items:center;
align-content:center;
font-family:'Nunito SemiBold';
`
let Container = styled.section`
display:flex;
flex-direction:column;

align-items:center;
align-content:center;
  width: 100vw;
  min-height: 90vh;
`;
let MapWrap = styled.div`
display:flex;
justify-content:flex-start;
border:3px solid rgb(88,88,88,0.50);
border-radius:10px 10px 10px 10px;
flex-wrap:wrap;
width:48rem;
`
let MapWrapTwo = styled(MapWrap)`
border:0px;
width:100%;

`
const GroupsView = (props) => {
  const push =useHistory().push
  const [groups, setGroups] = useState([]);
const {user,loggedInUser}=props


  useEffect(() => {
    setGroups(props.groups)
  },[props.groups]);

  const handleDelete=(user,group_id,filter)=>{
    axios.delete(`/api/delete-group?group_id=${group_id}&user=${user}&filter=${filter}`).then(res=>setGroups(res.data)).catch(err=>console.log(err))

}

  const handleLeave =(user,group_id,loggedInUser,filter)=>{
    axios.delete(`/api/groups?user=${user}&group_id=${group_id}&filter=${filter}&loggedInUser=${loggedInUser}`).then(res=>setGroups(res.data)).catch(err=>console.log(err))
    }

    const handleJoin=(group_id,user,loggedInUser,filter)=>{
      axios.post(`/api/groups/member?group_id=${group_id}&user=${user}&filter=${filter}&loggedInUser=${loggedInUser}`).then(res=>setGroups(res.data)).catch(err=>console.log(err))
  }
const MappedGroups = groups? groups.map((group,i)=>{
    return (
    <MappedGroupsView filter={props.filter} handleJoin={handleJoin} handleDelete={handleDelete} handleLeave={handleLeave} user={user} loggedInUser={loggedInUser} group={group} key={i}/>
    )
}
):(<></>)


  return <Container>

          <MapWrap><Row>
<Toggles onClick={props.handleAll}>all groups</Toggles> <Toggles onClick={props.handleUserGroups}>followed groups</Toggles></Row>
          <MapWrapTwo>
            <AddGroup onClick={()=>push('/add-new-group')}><AddGroupText id='text'>+</AddGroupText></AddGroup>

          {MappedGroups}

          </MapWrapTwo>

          </MapWrap>
          <Spacer></Spacer>
      </Container>;
};




export default GroupsView;
