import { useState, createContext } from "react";
import { getDataFromLocal } from "../Utils/Localstorage";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    const [curUser, setCurUser] = useState(getDataFromLocal("user") || {});
    const [isLoggedIn, setIsLoggedIn] = useState((!!getDataFromLocal('user')) || false);

    return <AuthContext.Provider value={{curUser, setCurUser, isLoggedIn, setIsLoggedIn}}>{children}</AuthContext.Provider>
} 

export {AuthProvider, AuthContext};

