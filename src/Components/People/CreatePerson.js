import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

let Container = styled.section`
  max-height: 10rem;
  width: 100%;
  background-color: rgb(252, 219, 166);
  padding: 5px;
  margin: 3px;
`;
let Row = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: left;
  justify-content: space-between;
`;
let Column = styled.div`
  display: flex;
  flex-direction: column;
`;
let TextInput = styled.input`
  width: 15vw;
  font-family: "Nunito Light";
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
max-height: 4rem;

padding: 10px;
border: 1px dotted rgb(88, 88, 88);
border-radius: 10px 10px 10px 10px;
`;
let PreviewDiv = styled.div`
height: 4rem;
width: 5rem;
text-align: center;
border: 1px dotted rgb(88, 88, 88);
border-radius: 10px 10px 10px 10px;
font-size: 10px;
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
`;
const CreatePerson = (props) => {
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(null);
  const [person, setPerson] = useState({});

  const handleImage = (img) => {
    setImage(img[0]);
    setPreview(URL.createObjectURL(img[0]));
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
            <Row>
              <Column>
                <Title>Name</Title>
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
                <Title>Birthday</Title>
                <TextInput
                  type="date"
                  onChange={(e) =>
                    setPerson({ ...person, birthday: e.target.value })
                  }
                  placeholder="MM-DD-YYYY"
                ></TextInput>
              </Column>
              <Column>
                <Title>Info</Title>
                <TextInput
                  onChange={(e) =>
                    setPerson({ ...person, message: e.target.value })
                  }
                  placeholder="Write Anything"
                ></TextInput>
              </Column>
            </Row>
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
