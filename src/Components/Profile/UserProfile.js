import React, { useEffect, useState } from "react";
import styled from "styled-components";

let Container = styled.section`
  display: flex;
  justify-content:center;
width:100vw;

`;
let ProfileRow = styled.div`
  display: flex;
justify-content:flex-start;
`;
let ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 219, 166);
  padding: 3rem;
  border:1px dotted rgb(88,88,88);
  border-radius: 10px 10px 10px 10px;
`;
let ImageContainer = styled.img`
  width: 200px;
  height: 250px;
  display: flex;
  border: 3px outset rgb(88, 88, 88, 0.792);
  border-radius: 10px;
`;
let TextContainer = styled.section`
  padding-left: 1rem;
  text-align: left;
`;
let ProfileTitle = styled.h4`
  font-family: "Nunito Black";
  font-size: 20px;
  padding: 2px;
`;

let ProfileText = styled.h1`
  font-family: "Nunito Light";

`;
let ProfileEdit = styled.h1`
  display: flex;

  font-family: "Nunito";
  font-size: 20px;

  justify-content: flex-end;
  align-items: center;
  color: white;

  height: 2rem;
  &:hover {
    background-color: rgb(88, 88, 88, 0.5);
  }
`;
const UserProfile = (props) => {
  const [editToggle, setEditToggle] = useState(false);
  const [showDisplay, setShowDisplay] = useState("none");
  const [newInfo, setNewInfo] = useState({
    first_name: props.loggedInUser.first_name,
    last_name: props.loggedInUser.last_name,
    birthday: props.loggedInUser.birthday,
    user_id: props.loggedInUser.user_id,
  });
  const [newEmail, setNewEmail] = useState({
    email: '',
    newEmail: "",
    password: "",
  });

  const { profilePicture, user, loggedInUser } = props;
  const { birthday, creation_date, email, first_name, last_name } = user;

  useEffect(() => {
    if (user.user_id !== loggedInUser.user_id) {
      setEditToggle(false);
    }
  }, [user, loggedInUser]);

  useEffect(() => {
    editToggle ? setShowDisplay("") : setShowDisplay("none");
  }, [editToggle]);

  const handleEditToggle = () => {
    editToggle ? setEditToggle(!editToggle) : setEditToggle(!editToggle);
  };

  let birthdayCheck =
    birthday !== null ? birthday : "Let People Know your Birthday!";

  let edit =
    user.user_id === loggedInUser.user_id ? (
      <ProfileEdit onClick={handleEditToggle}>Edit</ProfileEdit>
    ) : (
      <></>
    );
  let returnProile = (
    <ProfileContainer>
      <ProfileRow>
        <div>
          <ProfileTitle>Profile Picture</ProfileTitle>
          <ImageContainer src={profilePicture} alt={first_name} />
        </div>

        <TextContainer>
          <ProfileTitle>name</ProfileTitle>
          <ProfileText>{`${first_name} ${last_name}`}</ProfileText>
          <input
            onChange={(e) =>
              setNewInfo({ ...newInfo, first_name: e.target.value })
            }
            defaultValue={first_name}
            style={{ display: showDisplay }}
          ></input>
          <input
            onChange={(e) =>
              setNewInfo({ ...newInfo, last_name: e.target.value })
            }
            style={{ display: showDisplay }}
            defaultValue={last_name}
          ></input>

          <ProfileTitle>birthday</ProfileTitle>
          <ProfileText>{`${birthdayCheck}`}</ProfileText>
          <input
            onChange={(e) =>
              setNewInfo({ ...newInfo, birthday: e.target.value })
            }
            style={{ display: showDisplay }}
            defaultValue={birthdayCheck}
          ></input>
          <div
            style={{ display: showDisplay }}
            onClick={() => props.handleSubmit(newInfo)}
          >
            Submit
          </div>
          <ProfileTitle>email</ProfileTitle>
          <ProfileText>{`${email}`}</ProfileText>
          <input
            onChange={(e) =>
              setNewEmail({ ...newEmail, newEmail: e.target.value })
            }
            style={{ display: showDisplay }}
            defaultValue={newEmail.email}
          ></input>
          <input style={{display:showDisplay}}
            onChange={(e) =>
              setNewEmail({ ...newEmail, password: e.target.value })
            }
          ></input>
          <button
            onClick={() => props.handleEmailSubmit(newEmail.email,newEmail.newEmail,newEmail.password)}
            style={{ display: showDisplay }}
          >
            submit
          </button>
          <ProfileTitle>creation date</ProfileTitle>
          <ProfileText>{`${creation_date}`}</ProfileText>
        </TextContainer>
      </ProfileRow>

      {edit}
    </ProfileContainer>
  );

  return <Container>
    {returnProile}
    </Container>;
};

export default UserProfile;
