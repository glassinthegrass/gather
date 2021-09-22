import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Group from "./Group";

const PersonGroups = (props) => {
  const { person_id, groupToggle, push } = props;
  const [personGroups, setPersonGroups] = useState([]);

  useEffect(() => {
    if (groupToggle) {
      axios
        .get(`/api/person/groups?person_id=${person_id}`)
        .then((res) => setPersonGroups(res.data))
        .catch((err) => console.log(err));
    }
  }, [groupToggle, person_id]);
  const handleDelete = (group_id, person_id) => {
    axios
      .put(`/api/person-groups?group_id=${group_id}&person_id=${person_id}`)
      .then((res) => {
        setPersonGroups(res.data);
      })
      .catch((err) => console.log(err));
  };
  let mappedGroups = groupToggle ? (
    personGroups.map((group, i) => {
      return (
        <Group
          person_id={person_id}
          handleDelete={handleDelete}
          push={push}
          group={group}
          key={i}
        />
      );
    })
  ) : (
    <></>
  );
  return (
    <Container>
      <Center>{mappedGroups}</Center>
    </Container>
  );
};
export default PersonGroups;

let Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
let Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;
