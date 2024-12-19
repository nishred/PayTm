import React from "react";
import { UserContext } from "../context/UserContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = React.useContext(UserContext);

  if (!user.isAuthenticated) {
    <Navigate to={"/signin"} />;
  }

  return children;
};

export default Protected;
