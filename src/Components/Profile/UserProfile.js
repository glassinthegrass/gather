import React, { useEffect, useState } from "react";
import styled from "styled-components";

let Container = styled.section`
display:flex;
justify-content:center;


`
let ProfileRow = styled.div`
  display: flex;
;

`;
let ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 219, 166);

width:35rem;


  align-content: center;
  padding: 3rem;
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
  width: 20rem;
`;
let ProfileEdit = styled.h1`
  display: flex;
  width: 95%;
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

  const { profilePicture, user,loggedInUser } = props;

  const { birthday, creation_date, email, first_name, last_name } = user;

  useEffect(()=>{
    if(user.user_id !== loggedInUser.user_id){
      setEditToggle(false);
    }
  },[user,loggedInUser])
  useEffect(() => {
    editToggle ? setShowDisplay("") : setShowDisplay("none");
  }, [editToggle]);

  const handleEditToggle = () => {
    editToggle ? setEditToggle(!editToggle) : setEditToggle(!editToggle);
  };
  let birthdayCheck =
    birthday !== null ? birthday : "Let People Know your Birthday!";

    let edit = user.user_id === loggedInUser.user_id?  <ProfileEdit onClick={handleEditToggle}>Edit</ProfileEdit>:<></>;
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
            defaultValue={first_name}
            style={{ display: showDisplay }}
          ></input>
          <input
            style={{ display: showDisplay }}
            defaultValue={last_name}
          ></input>

          <ProfileTitle>email</ProfileTitle>
          <ProfileText>{`${email}`}</ProfileText>
          <input style={{ display: showDisplay }} defaultValue={email}></input>
          <ProfileTitle>birthday</ProfileTitle>
          <ProfileText>{`${birthdayCheck}`}</ProfileText>
          <input
            style={{ display: showDisplay }}
            defaultValue={birthdayCheck}
          ></input>
          <ProfileTitle>creation date</ProfileTitle>
          <ProfileText>{`${creation_date}`}</ProfileText>
          <input
            style={{ display: showDisplay }}
            defaultValue={creation_date}
          ></input>
          <div style={{ display: showDisplay }}>Submit</div>
        </TextContainer>
      </ProfileRow>
{edit}
    </ProfileContainer>
  );

  return <Container>{returnProile}</Container>;
};

export default UserProfile;
