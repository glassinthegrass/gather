import React from "react";
import { useHistory } from "react-router-dom";
import { StyledHeader, Arrow, Greeting, GreetingContainer } from "./styles";
const Header = (props) => {
  const history = useHistory();
  const url =
    `https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,r_max,f_png/` +
    props.user.picture_version +
    "/" +
    props.user.picture_public_id;

  const greeting = props.user.isLoggedIn ? (
    <GreetingContainer>
      <img src={url} alt={props.user.picture_public_id} />
      <Greeting>{`Hi ${props.user.first_name}!`}</Greeting>
    </GreetingContainer>
  ) : (
    <></>
  );

  return (
    <StyledHeader>
      {greeting}
      <div
        onClick={() => {
          props.logoutUser();
          history.push("/");
        }}
      >
        Logout
      </div>
      <Arrow>
        <Arrow onClick={() => history.go(-1)}> {"<"} </Arrow>
        <Arrow onClick={() => history.go(1)}>{">"}</Arrow>
      </Arrow>
    </StyledHeader>
  );
};

export default Header;
