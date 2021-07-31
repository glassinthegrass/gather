import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import MappedGroupsView from "./MappedGroupsView";
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
justify-content:center;
align-items:center;
align-content:center;
  width: 100%;
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
const Groups = (props) => {
    const { user_id } = props.user;
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/groups/${user_id}`)
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  }, [user_id]);

const MappedGroups = groups? groups.map((group,i)=>{
    return (
    <MappedGroupsView  user={props.user} group={group} key={i}/>
    )
}
):(<></>)


  return <Container>
      <Spacer>Visit a Hive</Spacer>
          <MapWrap>
          {MappedGroups}
          </MapWrap>
          <Spacer></Spacer>
      </Container>;
};



const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Groups);
