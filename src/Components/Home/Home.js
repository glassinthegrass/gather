import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import styled from "styled-components";

const HomeDiv = styled.section`
  width: 100%;
  heigth: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;
const Home = (props) => {
  const history = useHistory();
  const [announcements, setAnnouncements] = useState(null);
  const [groups, setGroups] = useState(null);
  const [friends, setFriends] = useState(null);
  const [idx, setIdx] = useState(0);
  const { user_id, isLoggedIn } = props.user;
  const { push } = history;

  useEffect(() => {
    if (!isLoggedIn) {
      push("/");
    }
  }, [isLoggedIn, push]);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`/api/home/${user_id}`)
        .then((res) => {
          setAnnouncements(res.data[0]);
          setGroups(res.data[1]);
          setFriends(res.data[2]);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, user_id]);

  const handleIncrement = () => {
    if (idx === announcements.length - 1) {
      setIdx(announcements.length - 1);
    } else if (idx >= 0 || idx < announcements.length - 1) {
      setIdx(idx + 1);
    }
  };

  const handleDecrement = () => {
    if (idx === 0) {
      setIdx(0);
    } else if (idx > 0 || idx < announcements.length - 1) {
      setIdx(idx - 1);
    }
  };

  const mappedAnnouncements = announcements ? (
    <div>
      <p onClick={() => handleDecrement()}>{"<"}</p>
      <p>{announcements[idx].group_name}</p>
      <h1>{announcements[idx].title}</h1>
      <p>{announcements[idx]?.announcement_picture}</p>
      <p>{announcements[idx]?.announcement_url}</p>
      <p onClick={() => handleIncrement()}>{">"}</p>
    </div>
  ) : (
    <></>
  );

  let mappedGroups = groups ? (
    groups.map((group, i) => {
      return <div key={i}>{group.group_name}</div>;
    })
  ) : (
    <></>
  );
  let mappedFriends = friends ? (
    friends.map((friend, i) => {
      return (
        <div key={i}>
          <p>{friend.friendfirstname}</p>
        </div>
      );
    })
  ) : (
    <></>
  );
  return (
    <HomeDiv>
      <div>{mappedAnnouncements}</div>
      <div>{mappedGroups}</div>
      <div>{mappedFriends}</div>
    </HomeDiv>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Home);
