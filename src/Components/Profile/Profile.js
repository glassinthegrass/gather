import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
let ProfileContainer = styled.section`
width:100%;
min-height:90vh;
`
const Profile = (props) => {
    console.log(props)
const {birthday,creation_date,email,phone_number,first_name,last_name,}=props.user
const{picture_public_id,picture_version,profile_picture_url}=props.user


  return (<ProfileContainer>

  </ProfileContainer>);
};
const mapStateToProps=reduxState=>{
    return reduxState.userReducer
}

export default connect(mapStateToProps)(Profile);
