import React from "react";

const Groups = (props) => {
const {group_name,picture_version,picture_public_id}=props.group

const url =
`https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,r_max,f_auto/` +
picture_version +
"/" +
picture_public_id;



  return <>
  <img src={url} alt={'asdf'}/>
  {group_name}</>;
};
export default Groups;
