import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import GroupsView from './GroupsView';
import styled from 'styled-components';
let Spacer = styled.div`
width:100vw;
height:3rem;
font-family:'Nunito Black';
font-size:20px;
display:flex;

justify-content:center;
align-items:center;
`


const Groups =(props)=>{
    const [filter,setFilter]=useState('all')
    const [groups,setGroups]=useState([]);


    const {user}=props,
        {user_id}=user;
        
        const handleAll = ()=>{
            setFilter('all');
        }
        const handleUserGroups =()=>{
            setFilter('user')
        }


    useEffect(() => {
        
          axios
          .get(`/api/groups/all?filter=${filter}&user_id=${user_id}`)
          .then((res) => setGroups(res.data))
          .catch((err) => console.log(err));
      },[filter,user_id]);
return <div>
    <Spacer>Visit a Hive</Spacer>
        
<GroupsView handleAll={handleAll} handleUserGroups={handleUserGroups} filter={filter} groups={groups} loggedInUser={user} user={user}/>
</div>
}
const mapStateToProps =(reduxState)=>{
    return reduxState.userReducer;
}
export default connect(mapStateToProps)(Groups)