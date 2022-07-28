import { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [curUser, setCurUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return <AuthContext.Provider value={{curUser, setCurUser, isLoggedIn, setIsLoggedIn}}></AuthContext.Provider>
} 

export {AuthProvider, AuthContext};

