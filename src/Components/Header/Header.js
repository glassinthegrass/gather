import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { StyledHeader, Arrow,Greeting, GreetingContainer } from "./styles";
const Header = (props) => {
  const history = useHistory();
  const [style, setStyle] = useState('flex-end');
  const[profilePicture,setProfilePicture]=useState('')
  const { isLoggedIn,user_id,first_name,profile_picture_url,picture_public_id,picture_version } = props.user;


  useEffect(() => {
    isLoggedIn ? setStyle('space-between') : setStyle('flex-end');
  }, [isLoggedIn, style]);

  useEffect(()=>{
    setProfilePicture(`https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,r_max,f_png/` +
    picture_version +
    "/" +
    picture_public_id);
  },[picture_version, picture_public_id])

    

  const greeting = props.user.isLoggedIn ? (
    <GreetingContainer>
      <Link to={`/profile/${user_id}`} >
        <img src={profilePicture} alt={profile_picture_url} />
      </Link>
      {isLoggedIn ? <Greeting>{`Hi ${first_name}!`}</Greeting>:<>Hi!</>}
    </GreetingContainer>
  ) : (
    <>Login!</>
  );

  return (
    <StyledHeader>

      {greeting}
      <Arrow>
        <Arrow onClick={() => history.go(-1)}> {"<"} </Arrow>
        <Arrow onClick={() => history.go(1)}>{">"}</Arrow>
        <img
          src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png"
          alt={"menu"}
          onClick={() => props.handleMenuToggle()}
          />
      </Arrow>

    </StyledHeader>
  );
};

export default Header;
