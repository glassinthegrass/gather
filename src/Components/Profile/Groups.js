import axios from 'axios';
import React,{useEffect, useState} from 'react';

import GroupsView from '../Groups/GroupsView';


const Groups = (props)=>{
    const [filter,setFilter]=useState('user')
    const [groups,setGroups]=useState([]);
    const {user,loggedInUser}=props

const {user_id}=user

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
<GroupsView handleAll={handleAll} handleUserGroups={handleUserGroups} filter={filter} groups={groups} loggedInUser={loggedInUser} user={user}/>
</div>
}
export default Groups