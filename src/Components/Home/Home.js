import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  const [groups, setGroups] = useState(null);
  const { announcements } = props.history.location.state,
    { user_id, isLoggedIn } = props.user;
  useEffect(() => {
    if (isLoggedIn) {
      axios.get(`/api/groups/${user_id}`).then((res) => setGroups(res.data));
    }
  }, [isLoggedIn, user_id, setGroups]);

  let mappedAnnouncements = announcements.map((ann, i) => {
    return (
      <div key={i}>
        <p>{ann.group_name}</p>
        <h1>{ann.title}</h1>
        <p>{ann?.announcement_picture}</p>
        <p>{ann?.announcement_url}</p>
      </div>
    );
  });

  let mappedGroups = groups ? (
    groups.map((group, i) => {
      return <div key={i}>{group.group_name}</div>;
    })
  ) : (
    <></>
  );

  return (
    <>
      {mappedAnnouncements}
      {mappedGroups}
    </>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Home);
