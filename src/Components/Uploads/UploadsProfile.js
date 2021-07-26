import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import styled from "styled-components";

let UploadContainter=styled.section`
min-height:90vh;
`

const UploadsProfile = (props) => {
  const { user_id } = props.user;
  const [response, setResponse] = useState(null);
  const { getUser } = props;
  
  const handleUpload = (img) => {
      let fileData = new FormData();
      fileData.append("image", img[0]);
      let config = {
          headers: {
              "Content-Type": "multipart/form-data",
            },
        };
        
    axios
      .post(`/api/images/${user_id}`,fileData, config)
      .then(function (res) {
        setResponse(res.data);
      })
      .catch((err) => console.log(err));
    };

  useEffect(() => {
    if (response) {
      getUser(user_id);
    }
  }, [user_id, response, getUser]);

  return (<>
    <UploadContainter>
    <div className="button">
      <label htmlFor="single">{">"}</label>
      <input
        type="file"
        id="single"
        onChange={(e) => handleUpload(e.target.files)}
      />

      {response ? <img src={response} alt={"userProfile"} /> : <></>}
    </div>
    </UploadContainter>
    </>
  );
};

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { getUser })(UploadsProfile);
