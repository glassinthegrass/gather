import React, {useState, createContext} from 'react';
import {CloudinaryContext} from 'cloudinary-react'
export const userContext = createContext()

const UserContextProvider = (props) => {
    const [user, setUser] = useState({isLoggedIn:false})
    return (
        
        <userContext.Provider value={[user,setUser]}>
            <CloudinaryContext cloudName='glassinthegrass'secure='true'>
            {props.children}
        </CloudinaryContext>
        </userContext.Provider>
    )
}

export default UserContextProvider
