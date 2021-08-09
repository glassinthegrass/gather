import axios from "axios";
import React, { useEffect, useState,useCallback } from "react";
import styled from "styled-components";

let Container = styled.section`
width:100vw;
min-height:90vh;
display:flex;
flex-direction:column;
justify-content:center;
`
const Announcement = (props) => {

  const { announcement_id } = props.match.params;
  const [announcement, setAnnouncement] = useState(null);
const [paragraphs,setParagraphs]= useState(null);


const getAnnouncement=useCallback(()=>{
    axios
    .get(`/api/announcements/${announcement_id}`)
    .then((res) => {
        setAnnouncement(res.data[0])
        setParagraphs(res.data[1])
    })
    .catch((err) => 
    console.log(err)
    );
},[announcement_id])


useEffect(() => {
    getAnnouncement()
}, [getAnnouncement]);

const announcementUrl =announcement ?
`https://res.cloudinary.com/glassinthegrass/image/upload/w_600,h_400,c_pad,f_auto/` +
announcement.announcement_picture_version +
"/" +
announcement.announcement_public_id:"";

const groupUrl =announcement ?
`https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,f_auto/` +
announcement.group_picture_version +
"/" +
announcement.group_public_id:"";


const mappedParagraphs =paragraphs?paragraphs.map((para,i)=>{
    return <p key={i}>{para.paragraph_content}</p>
}):''


  return <Container><div>
    {console.log(props)}
    {console.log(announcement)}

        <img src={announcementUrl} alt={""} />
        <h1>{announcement?.title}</h1>
        <img src={groupUrl} alt={"asdfasdfas"} />
        <h1>{announcement?.group_name}</h1>
        <p>{`${announcement?.first_name} ${announcement?.last_name}`}</p>
        {mappedParagraphs}

      </div>
      </Container>
};

export default Announcement;
