import React, {useState, createContext} from 'react';

export const userContext = createContext()

const UserContextProvider = (props) => {
    const [user, setUser] = useState({isLoggedIn:false})

    return (
        <userContext.Provider value={[user,setUser]}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserContextProvider
