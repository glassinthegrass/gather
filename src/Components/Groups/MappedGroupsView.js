import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
let Container = styled.section`
display:flex;
justify-content:center;

width:12rem;
`
let GroupImage = styled.img`
border:3px solid rgb(88,88,88);
border-radius:25px 25px 25px 25px;
background-color:rgb(252, 142, 52, 0.792);
padding:10px;
margin:10px;
`
let GroupName = styled.h6`
position:absolute;
margin-top:3rem;
z-index:1;
font-family:'Nunito Black';
color:rgb(247,242,234);
text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
`
const MappedGroupsView =(props)=>{
    const push= useHistory().push
    const {group_name,picture_version,picture_public_id}=props.group

const url =
`https://res.cloudinary.com/glassinthegrass/image/upload/w_125,h_125,c_fill_pad,g_auto,f_auto/` +
picture_version +
"/" +
picture_public_id;

const handleGroupClick=()=>{
    push(`/groups/${group_name}`)
}

return(
<Container>
    <GroupImage onClick={()=>handleGroupClick()} src={url} alt='asdf'/>
<GroupName>
    {group_name}
    </GroupName>
</Container>
)
}

export default MappedGroupsView