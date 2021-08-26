import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

let Container = styled.section`
  width: 100%;
  background-color: rgb(252, 219, 166);
  padding: 5px;
`;
let Row = styled.div`
  display: flex;
  justify-content:center;
  align-items: flex-start;
  text-align: left;
  width:100%;

`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
`;
let TextInput = styled.input`
  width:70%;
  font-family: "Nunito Light";
  padding:3px;

`;

let Title = styled.h6`
  font-family: "Nunito Light";
  font-size: 15px;
`;
let Headline = styled.h1`
  font-size: 20px;
  font-family: "Nunito";
`;
let PreviewImage = styled.img`
max-height: 8rem;

padding: 10px;
border: 1px dotted rgb(88, 88, 88);
border-radius: 10px 10px 10px 10px;
`;
let PreviewDiv = styled.div`
height: 8rem;
width: 4rem;
display:flex;
align-items:center;
text-align: center;
border: 1px dotted rgb(88, 88, 88);
border-radius: 10px 10px 10px 10px;
font-size: 18px;
padding:10px;
cursor:pointer;
margin:5px;
background-color:rgb(88,88,88,0.3);
text-shadow: -0.5px 0 white, 0 0.5px white, 0.5px 0 white, 0 -0.5px white;
&:hover{
  border:3px solid rgb(88,88,88);
  }
  &:
  &:hover #text{
    color:rgb(88,88,88,0.7);
  }
  &:active{
    border:3px solid rgb(88,88,88,0.1);
    background-color:rgb(252,142,52,0.792);
    color:white;
  }


`;
let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

let Label = styled.label`
  font-family: "Nunito";
  display: flex;
  font-size: 10px;
  flex-direction: column;
`;
let Submit = styled.div`
  width: 5rem;
  height: 1rem;
  text-align: center;
  background-color: rgb(88, 88, 88, 0.8);
  padding: 5px;
  margin: 5px;
  font-family: "Nunito";
  cursor: pointer;
`;
let FirstRow = styled.div`
width:100%;
display:flex;
flex-direction:column;
`
const CreatePerson = (props) => {
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(null);
  const [person, setPerson] = useState({});

  const handleImage = (img) => {
    if (img[0]) {
      setImage(img[0]);
      setPreview(URL.createObjectURL(img[0]));
    } else {
      setImage([]);
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    let fileData = new FormData();
    fileData.append("image", image);
    let config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `/api/people?first_name=${person.first_name}&last_name=${person.last_name}&birthday=${person.birthday}&message=${person.message}&creator=${props.creator}`,
        fileData,
        config
      )
      .then((res) => props.setPeople(res.data))
      .catch((err) => console.log(err));
  };
  let imgSwitch = preview ? (
    <PreviewImage src={preview} alt="" />
  ) : (
    <PreviewDiv>Select A Photo</PreviewDiv>
  );
  return (
    <Container>
      <Column>

        <Headline>Add A Person</Headline>
        <Row>
          <HiddenInput
            onChange={(e) => handleImage(e.target.files)}
            type="file"
            id="single"
          />
          <Label htmlFor="single">{imgSwitch}</Label>
          <Column>
            <FirstRow>
              <Column>
                <Title>name</Title>
                <Row>
                  <TextInput
                    onChange={(e) =>
                      setPerson({ ...person, first_name: e.target.value })
                    }
                    placeholder="First Name"
                  ></TextInput>{" "}
                  <TextInput
                    onChange={(e) =>
                      setPerson({ ...person, last_name: e.target.value })
                    }
                    placeholder="Last Name"
                  ></TextInput>
                </Row>
              </Column>
              <Column>
                <Title>birthday</Title>
                <TextInput
                  type="date"
                  onChange={(e) =>
                    setPerson({ ...person, birthday: e.target.value })
                  }
                  placeholder="MM-DD-YYYY"
                ></TextInput>
              </Column>
              <Column>
                <Title>interest</Title>
                <TextInput
                  onChange={(e) =>
                    setPerson({ ...person, message: e.target.value })
                  }
                  placeholder="What do they like?"
                ></TextInput>
              </Column>
            </FirstRow>
            <Row>
              <div></div>
              <Submit onClick={() => handleSubmit()}>Submit</Submit>
            </Row>
          </Column>
        </Row>
      </Column>
    </Container>
  );
};

export default CreatePerson;
