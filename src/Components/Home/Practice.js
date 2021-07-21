import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getUser} from '../../redux/userReducer'
import axios from "axios";

const Practice = (props) => {
  console.log(props)
  const { user_id } = props.user;
  const [response, setResponse] = useState(null);

  const handleUpload = (img) => {
    console.log(img[0])
    let fileData = new FormData();
    fileData.append("image", img[0]);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`/api/images/${user_id}`, fileData, config)
      .then(function (res) {
        setResponse(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const {getUser}=props
useEffect(()=>{
if(response){
getUser()
}
},[response,getUser])
  return (
    <div className="button">
      <label htmlFor="single">{">"}</label>
      <input
        type="file"
        id="single"
        onChange={(e) => handleUpload(e.target.files)}
      />

      
      {response ? <img src={response} alt={"userProfile"} /> : <></>}
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps,{getUser})(Practice);
