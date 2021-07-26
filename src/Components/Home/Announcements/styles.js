import styled from "styled-components";
export let AnnouncementContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height:60vh;
`;

export let NavContainer = styled.section`
display:flex;
justify-content:space-between;
flex-direction:row;
max-width:80%;
height:3rem;
font-size:3rem;
margin-left:10%;
`
export let NavArrows = styled.p`
display:flex;
justify-content:space-around;
align-items:center;
font-size:5rem;
width:5rem;
&:hover {
    background-color: rgb(88,88,88);
color:rgb(252, 142, 52, 0.792);
  };
  &:active{
    background-color:rgb(252,142,52,0.792);
    color:rgb(88,88,88);
  };
`
export let AnnouncementImageSpacer =styled.div`
height:10vh;
`
export let Title= styled.h1`
position:absolute;
font-size:30px;
margin-top:6rem;
text-shadow: -1.5px 0 white, 0 1.5px white, 1.5px 0 white, 0 -1.5px white;
max-width:60vw;
color:rgb(88, 88, 88);
z-index:1;
`
export let GroupImage = styled.img`
position:absolute;
max-height:40px;
margin-top:23.5rem;
margin-left:-18rem;
z-index:1;
`
export let AnnouncementImage= styled.img`
background-color:rgb(252, 219, 166);
border:1px solid rgb(88,88,88);
box-shadow: 10px 0px 13px -7px #897b7b, 0px 7px 13px -7px #000000;
&:hover{
    background-color:rgb(252, 142, 52, 0.6);
};
&:active{
    background-color:rgb(88,88,88);
}
`
export let GroupName= styled.h6`
position:absolute;
margin-top:26rem;
margin-right:33rem;
z-index:1;
`
export let AuthorName =styled.p`
position:absolute;
margin-right:-30rem;
z-index:1;
`