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

      const handleGroupSearch =(groupName)=>{
        if(groupName.length>2){
          axios.get(`/api/groups?searchQuery=${groupName}`).then(res=>{
           if(res.data[0]){
             setGroups(res.data)
            }else{
              axios
              .get(`/api/groups/all?filter=${filter}&user_id=${user_id}`)
              .then((res) => {
      
              setGroups(res.data)
      
              })
              .catch((err) => console.log(err));
             }
            }).catch(err=>console.log(err))
        }else{
          axios
            .get(`/api/groups/all?filter=${filter}&user_id=${user_id}`)
            .then((res) => {
    
            setGroups(res.data)
    
            })
            .catch((err) => console.log(err));
        }
      }
return <div>
<GroupsView handleAll={handleAll} handleGroupSearch={handleGroupSearch}handleUserGroups={handleUserGroups} filter={filter} groups={groups} loggedInUser={loggedInUser} user={user}/>
</div>
}
export default Groups