import React, { useEffect, useState } from "react";
import styled from "styled-components";
import bee from "../../Assets/Gather_Line_with_Bee.png";
import Loading from "../Loading";

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
    email: "",
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
      <EditContainer>
        <ProfileEdit onClick={handleEditToggle}>edit</ProfileEdit>
      </EditContainer>
    ) : (
      <></>
    );
  let editPicture = editToggle ? (
    <PictureInput onClick={() => props.push("/profile/uploads")}>
      change your profile picture
    </PictureInput>
  ) : (
    <ImageContainer src={profilePicture} alt={first_name} />
  );
  let loadingToggleDisplay = props.loadingToggle ? (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  ) : (
    editPicture
  );
  let returnProile = user?.user_id ? (
    <ProfileContainer>
      <ProfileRow>
        <div>
          <ProfileTitle>profile picture</ProfileTitle>
          {loadingToggleDisplay}
        </div>

        <TextContainer>
          <ProfileTitle>name</ProfileTitle>
          <ProfileText>{`${first_name} ${last_name}`}</ProfileText>
          <Input
            onChange={(e) =>
              setNewInfo({ ...newInfo, first_name: e.target.value })
            }
            defaultValue={first_name}
            style={{ display: showDisplay }}
          ></Input>
          <Input
            onChange={(e) =>
              setNewInfo({ ...newInfo, last_name: e.target.value })
            }
            style={{ display: showDisplay }}
            defaultValue={last_name}
          ></Input>

          <ProfileTitle>birthday</ProfileTitle>
          <ProfileText>{`${birthdayCheck}`}</ProfileText>
          <Input
            onChange={(e) =>
              setNewInfo({ ...newInfo, birthday: e.target.value })
            }
            style={{ display: showDisplay }}
            defaultValue={birthdayCheck}
          ></Input>
          <Submit
            style={{ display: showDisplay }}
            onClick={() => props.handleSubmit(newInfo)}
          >
            submit profile
          </Submit>
          <ProfileTitle>email</ProfileTitle>
          <ProfileText>{`${email}`}</ProfileText>
          <Column>
            <Input
              onChange={(e) =>
                setNewEmail({ ...newEmail, newEmail: e.target.value })
              }
              style={{ display: showDisplay }}
              placeholder="New Email Here"
            />
            <Input
              style={{ display: showDisplay }}
              type="password"
              placeholder="Verify Password"
              onChange={(e) =>
                setNewEmail({ ...newEmail, password: e.target.value })
              }
            />
          </Column>
          <Submit
            onClick={() =>
              props.handleEmailSubmit(
                newEmail.email,
                newEmail.newEmail,
                newEmail.password
              )
            }
            style={{ display: showDisplay }}
          >
            submit email
          </Submit>
          <ProfileTitle>creation date</ProfileTitle>
          <ProfileText>{`${creation_date}`}</ProfileText>
        </TextContainer>
      </ProfileRow>

      {edit}
    </ProfileContainer>
  ) : (
    <></>
  );

  return (
    <Container>
      <Bee src={bee} alt="" />
      {returnProile}
    </Container>
  );
};

export default UserProfile;
let Bee = styled.img`
  max-height: 35vh;
  position: absolute;
  margin-left: 5.5rem;
  margin-top: 1rem;
  transform: rotate(100deg);
  z-index: 1;
  @media (max-width: 600px) {
    margin-top: 29.2rem;
    margin-left: -0.3rem;
    transform: rotate(23deg);
    width: 10rem;
  }
`;
let Submit = styled.div`
  width: 98%;
  height: 1rem;
  border: 1px solid rgb(88, 88, 88, 0.5);
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-weight: 300;
  cursor: pointer;
  background-color: rgb(88, 88, 88);
  color: rgb(252, 142, 52);
  &:hover {
    background-color: rgb(252, 142, 52, 0.7);
    color: rgb(88, 88, 88);
  }
`;
let PictureInput = styled.div`
  width: 200px;
  height: 250px;
  border: 1px solid rgb(88, 88, 88, 0.5);
  cursor: pointer;
  font-size: 25px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  box-shadow: 10px 0px 13px -12px #897b7b, 0px 7px 13px -7px #000000;
  background-color: rgb(252, 219, 166);
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.5);
    color: rgb(88, 88, 88);
  }
`;
let Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
  z-index: 1;
`;
let ProfileRow = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1;
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1rem;
    align-items: flex-start;
  }
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
let Input = styled.input`
  width: 100%;
`;
let ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 219, 166);
  padding: 2.5rem;
  border: 1px dotted rgb(88, 88, 88);
  border-radius: 10px 10px 10px 10px;
`;
let ImageContainer = styled.img`
  width: 200px;
  height: 250px;
  display: flex;
  border: 3px outset rgb(88, 88, 88, 0.792);
  border-radius: 10px;
  z-index: 1;
`;
let TextContainer = styled.section`
  padding-left: 1rem;
  text-align: left;

  z-index: 1;
`;
let ProfileTitle = styled.h4`
font-weight: 900;
  font-size: 20px;
  padding: 2px;
  background-color: rgb(252, 219, 166);
  z-index: 1;
`;

let ProfileText = styled.h1`
font-weight: 300;
  background-color: rgb(252, 219, 166);
  z-index: 1;
`;
let EditContainer = styled.div`
  width: 100%;
  display: flex;
  z-index: 1;
  justify-content: flex-end;
`;
let ProfileEdit = styled.h1`
  z-index: 1;
  width: 2.5rem;
  font-weight: 400;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 2rem;
  cursor: pointer;
  padding: 5px;
  text-align: center;
  &:hover {
    background-color: rgb(88, 88, 88);
    color: rgb(252, 142, 52, 0.792);
  }
  &:active {
    background-color: rgb(252, 142, 52, 0.792);
    color: rgb(88, 88, 88);
  }
`;
let LoadingContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
