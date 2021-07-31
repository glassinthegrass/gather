import axios from "axios";
import React, { useEffect, useState,useCallback } from "react";
import {AnnouncementContainer,AnnouncementImageSpacer,Title,GroupImage,AnnouncementImage,GroupName,AuthorName,} from "../Home/Announcements/styles";
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
`https://res.cloudinary.com/glassinthegrass/image/upload/w_1080,h_540,c_pad,f_auto/` +
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


  return <AnnouncementContainer>
      <AnnouncementImageSpacer></AnnouncementImageSpacer>
        <AnnouncementImage src={announcementUrl} alt={"announcement pic"} />
        <Title>{announcement?.title}</Title>
        <GroupImage src={groupUrl} alt={"group pic"} />
        <GroupName>{announcement?.group_name}</GroupName>
        <AuthorName>{`${announcement?.first_name} ${announcement?.last_name}`}</AuthorName>
  {mappedParagraphs}
        <AnnouncementImageSpacer></AnnouncementImageSpacer>
      </AnnouncementContainer>;
};

export default Announcement;
