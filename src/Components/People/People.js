import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
let Container = styled.section`
width:100vw;
min-height:90vh;
`
const People = (props)=>{
    return<Container>asdf</Container>
}
const mapStateToProps=(reduxState)=>{
    return reduxState.userReducer
}
export default connect(mapStateToProps)(People)