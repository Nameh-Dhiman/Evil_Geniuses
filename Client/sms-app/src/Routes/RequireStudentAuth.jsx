import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


export const RequireStudentAuth = ({children}) => {
    const { isLoggedIn, curUser } = useContext(AuthContext);
    
    let location = useLocation();

    if (isLoggedIn && curUser.role === "student") return children;
    else return <Navigate to="/signin" state={{ from: location }} replace />;
};