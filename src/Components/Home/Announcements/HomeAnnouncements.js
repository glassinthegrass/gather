import React from "react";
import { useHistory } from "react-router";
import {AnnouncementContainer,LeftArrow,RightArrow,Title,GroupImage,AnnouncementImage,GroupName,AnnouncementGroup,AuthorName,} from "./styles";
import styled from "styled-components";
import { Link } from "react-router-dom";

let Container = styled.div`
display:flex;
flex-direction:row;
`

const HomeAnnouncements = (props) => {
const history= useHistory(),
{push}=history

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
        <LeftArrow onClick={() => handleDecrement()}>{"<"}</LeftArrow>
      <AnnouncementContainer onClick={handleAnnouncementClick}>
        <AnnouncementImage src={announcementUrl} alt={"announcement pic"} />
        <Title>{announcements[idx].title}</Title>
<AnnouncementGroup>
        <img src={groupUrl} alt={"group pic"} />
        <GroupName>{announcements[idx].group_name}</GroupName>
</AnnouncementGroup>
        <AuthorName>{`${announcements[idx].first_name} ${announcements[idx].last_name}`}</AuthorName>
      </AnnouncementContainer>
        <RightArrow onClick={() => handleIncrement()}>{">"}</RightArrow>
    </Container>

  );

  return <>{announcementDisplay}</>;
};
export default HomeAnnouncements;
