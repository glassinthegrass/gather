import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
// import hexagon from '../../Assets/BeePiecesWing.png'
let Container = styled.section`
  width: 100%;
  min-height: 90vh;
  display:flex;
align-items:center;
  flex-direction:column;
`;
let ProfileContainer = styled.div`
display:flex;
align-items:center;
  flex-direction:column;
width:50vw;
`
let ImageContainer = styled.img`
width:200px;
height:250px;
display:flex;

`
const Profile = (props) => {
    console.log(props)
  const { isLoggedIn } = props.user;
  const history = useHistory(),
    { push } = history;
  const { user_id } = props.match.params;
  const [user, setUser] = useState('');
  const [profilePicture, setProfilePicture] = useState("");

useEffect(()=>{
    if(isLoggedIn===false){
        push('/')
    }
})

  useEffect(() => {
    axios
    .get(`/api/profile/${user_id}`)
    .then((res) => setUser(res.data))
    .catch((err) => console.log(err));
  }, [user_id]);

  const {birthday,creation_date,email,phone_number,first_name,last_name, picture_public_id, picture_version} = user;


  useEffect(() => {
    setProfilePicture(
      `https://res.cloudinary.com/glassinthegrass/image/upload/w_200,h_250,g_auto,c_fill,r_15,f_png/` +
        picture_version +
        "/" +
        picture_public_id
    );
  }, [picture_version, picture_public_id]);


  let profile = isLoggedIn ? ( <ProfileContainer>
    <ImageContainer src={profilePicture} alt={first_name}/>
    <h3>{`${first_name} ${last_name}`}</h3>
    <h6>{`${creation_date}`}</h6>
    <h6>{`${birthday}`}</h6>
    <p>{`${email}`}</p>
    <p>{`${phone_number}`}</p>
    </ProfileContainer>):<></>


  return (
    <Container>
        {profile}
    </Container>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Profile);
