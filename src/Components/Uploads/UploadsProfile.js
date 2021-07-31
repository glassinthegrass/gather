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
  const [photo,setPhoto]=useState([])

  const handleUpload = (img) => {
    setPhoto(img[0])
      // fileData.append("image", img[0]);
    };
    const handlePhoto = ()=>{
      let fileData = new FormData();
      fileData.append("image",photo);
      
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

    }
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
<button onClick={()=>handlePhoto()}>asdf</button>
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
