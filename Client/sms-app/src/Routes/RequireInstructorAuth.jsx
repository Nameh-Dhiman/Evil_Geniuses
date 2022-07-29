import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const RequireInstructorAuth = ({ children }) => {
  const { isLoggedIn, curUser } = useContext(AuthContext);

  let location = useLocation();

  if (isLoggedIn && curUser.role === "instructor") return children;
  else return <Navigate to="/signin" state={{ from: location }} replace />;
};
