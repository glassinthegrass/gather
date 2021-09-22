import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { userContext } from "../../userContext";
import { useHistory } from "react-router-dom";
import GroupsView from "./GroupsView";
import styled from "styled-components";

const Groups = (props) => {
  const [filter, setFilter] = useState("all");
  const [groups, setGroups] = useState([]);
  const push = useHistory().push;
  const [user] = useContext(userContext);
  const { user_id, isLoggedIn } = user;

  const handleAll = () => {
    setFilter("all");
  };
  const handleUserGroups = () => {
    setFilter("user");
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      push("/");
    }
  }, [isLoggedIn, push]);
  useEffect(() => {
    axios
      .get(`/api/groups/all?filter=${filter}&user_id=${user_id}`)
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  }, [filter, user_id]);
  const handleGroupSearch = (groupName) => {
    if (groupName.length > 2) {
      axios
        .get(`/api/groups?searchQuery=${groupName}`)
        .then((res) => {
          if (res.data[0]) {
            setGroups(res.data);
          } else {
            axios
              .get(`/api/groups/all?filter=${filter}&user_id=${user.user_id}`)
              .then((res) => {
                setGroups(res.data);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/api/groups/all?filter=${filter}&user_id=${user.user_id}`)
        .then((res) => {
          setGroups(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Container>
      <Spacer>Visit a Hive</Spacer>

      <GroupsView
        handleAll={handleAll}
        handleGroupSearch={handleGroupSearch}
        handleUserGroups={handleUserGroups}
        filter={filter}
        groups={groups}
        loggedInUser={user}
        user={user}
      />
    </Container>
  );
};

export default Groups;

let Container = styled.section`
  width: 100vw;
  min-height: 95vh;
`;
let Spacer = styled.div`
  height: 3rem;

  font-weight: 900;
  font-size: 20px;
  display: flex;

  justify-content: center;
  align-items: center;
`;
