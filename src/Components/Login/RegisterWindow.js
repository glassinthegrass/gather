import React from 'react';
import { Input,Submit,Error } from './styles';
export const RegsiterWindow = ({user,push,handle,regError,newUser})=>(
    <React.Fragment>
      <Input
        onChange={(e) => handle.newUser({...newUser,username:e.target.value})}
        className="registerInput"
        value={newUser.username}
        type="text"
        placeholder="Pick a username!"
      />
      <Input
        onChange={(e) => {
          handle.newUser({ ...newUser, email: e.target.value });
        }}
        className="registerInput"
        value={newUser.email}
        type="text"
        placeholder="What's your email?"
      />
      <Input
        onChange={(e) =>handle.newUser({...newUser,first_name:e.target.value})}
        className="registerInput"
        type="text"
        placeholder="What's your first name?"
      />
      <Input
        onChange={(e) => {handle.newUser({...newUser,last_name:e.target.value})}}
        className="registerInput"
        type="text"
        placeholder="What's your last name?"
      />
      <Input
        onChange={(e) => {handle.newUser({...newUser,password:e.target.value})}}
        className="registerInput"
        type="password"
        placeholder="Enter a password"
      />
      <Input
        onChange={(e) => handle.newUser({ ...newUser, passwordTwo: e.target.value })}
        onKeyPress={(e) => handle.registerKeyPress(e)}
        className="registerInput"
        type="password"
        placeholder="Re-enter your password"
      />
      {regError && <Error>{regError}</Error>}
      {user.isRegistered ? (
        <Submit onClick={() => push("/profile/uploads")}>Next</Submit>
      ) : (
        <Submit onClick={() => handle.register()}>Submit</Submit>
      )}
    </React.Fragment>
)
