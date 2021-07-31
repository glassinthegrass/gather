import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeAnnouncements from './Announcements/HomeAnnouncements'
import Groups from './Groups'
import { useHistory } from "react-router";
import { connect } from "react-redux";
import styled from "styled-components";

const HomeDiv = styled.div`
display: flex;
justify-content: center;
flex-direction:column;
align-items: center;
align-content: center;
min-width:80%;
min-height:90vh;
font-family:'Nunito Black'
`;

let GroupsDiv= styled.div`
display:flex;
height:10vh;
width:30rem;
justify-content:flex-start;
overflow-x: scroll;
`
let Title= styled.h6`
margin:20px;
padding:10px;
`

const Home = (props) => {
  const history = useHistory();
  const { push } = history;
  const [announcements, setAnnouncements] = useState(null);
  const [groups, setGroups] = useState(null);

  const [idx, setIdx] = useState(0);
  const { user_id, isLoggedIn } = props.user;

  useEffect(() => {
    if (isLoggedIn===false) {
      push('/')
    }
  }, [isLoggedIn, push]);

  useEffect(() => {
    if(isLoggedIn===true){
      axios
        .get(`/api/home/${user_id}`)
        .then((res) => {
          setAnnouncements(res.data[0]);
          setGroups(res.data[1]);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn,user_id]);

  const handleIncrement = () => {
    if (idx === announcements.length - 1) {
      setIdx(0);
    } else if (idx >= 0 || idx < announcements.length - 1) {
      setIdx(idx + 1);
    }
  };

  const handleDecrement = () => {
    if (idx === 0) {
      setIdx(announcements.length-1);
    } else if (idx > 0 || idx < announcements.length - 1) {
      setIdx(idx - 1);
    }
  };

  const showAnnouncements = announcements ? (
   <HomeAnnouncements idx={idx} handleIncrement={handleIncrement} handleDecrement={handleDecrement} announcements={announcements}/>
  ) : (
    <></>
  );

  const mappedGroups = groups ? (
    groups.map((group, i) => {
      return <Groups group={group} key={i}/>
    })
  ) : (
    <></>
  );

  return (
    <HomeDiv>
      <Title>Recent Announcements</Title>
      <div>{showAnnouncements}</div>
      <Title>Groups</Title>
      <GroupsDiv>{mappedGroups}</GroupsDiv>

    </HomeDiv>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Home);
