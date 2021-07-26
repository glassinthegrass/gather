import React from "react";
import { useHistory } from "react-router";
import {AnnouncementContainer,NavArrows,AnnouncementImageSpacer,Title,GroupImage,AnnouncementImage,GroupName,AuthorName,} from "./styles";
import styled from "styled-components";

let Container = styled.div`
display:flex;
flex-direction:row;
`

const HomeAnnouncements = (props) => {
    console.log(props)
const push= useHistory().push

  const { announcements, idx, handleIncrement, handleDecrement } = props;

  const announcementUrl =
    `https://res.cloudinary.com/glassinthegrass/image/upload/w_780,h_540,c_pad,f_auto/` +
    announcements[idx].announcement_picture_version +
    "/" +
    announcements[idx].announcement_picture_public_id;

  const groupUrl =
    `https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,f_auto/` +
    announcements[idx].group_picture_version +
    "/" +
    announcements[idx].group_picture_public_id;

let handleAnnouncementClick=()=>{
push(`/announcements/${announcements[idx].announcement_id}`)
}

  let announcementDisplay = (

    <Container>

        <AnnouncementImageSpacer></AnnouncementImageSpacer>
        <NavArrows onClick={() => handleDecrement()}>{"<"}</NavArrows>
      <AnnouncementContainer onClick={handleAnnouncementClick}>
        <AnnouncementImage src={announcementUrl} alt={"announcement pic"} />
        <Title>{announcements[idx].title}</Title>
        <GroupImage src={groupUrl} alt={"group pic"} />
        <GroupName>{announcements[idx].group_name}</GroupName>
        <AuthorName>{`${announcements[idx].first_name} ${announcements[idx].last_name}`}</AuthorName>
      </AnnouncementContainer>
        <NavArrows onClick={() => handleIncrement()}>{">"}</NavArrows>
    </Container>

  );

  return <>{announcementDisplay}</>;
};
export default HomeAnnouncements;
