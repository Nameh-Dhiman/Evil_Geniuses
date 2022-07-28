import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


export const RequireAuth = ({children}) => {
    const { isLoggedIn } = useContext(AuthContext);
    
    let location = useLocation();

    if (isLoggedIn) return children;
    else return <Navigate to="/signin" state={{ from: location }} replace />;
};