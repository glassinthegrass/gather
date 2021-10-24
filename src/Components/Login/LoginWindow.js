import React from 'react'
import { Input,Row,Checkbox,Submit,Error } from './styles';
export const LoginWindow=({handle,remember,loginError,loginUser})=>(
    <React.Fragment>
    <Input
      onChange={(e) => handle.loginEmail(e.target.value)}
      placeholder="Enter email"
      value={loginUser.email}
    />
    <Input
      onChange={(e) => handle.loginPassword(e.target.value)}
      onKeyPress={(e) => {
        handle.loginKeyPress(e);
      }}
      value={loginUser.password}
      type="password"
      placeholder="Enter password"
    />
    <Row>
      remember me?
      <Checkbox
        name="remember me"
        onChange={handle.remember}
        value={remember}
        checked={remember}
        type="checkbox"
      />
    </Row>
    {loginError && <Error>{loginError}</Error>}

    <Submit onClick={() => handle.login()}>Submit</Submit>
  </React.Fragment>
)

