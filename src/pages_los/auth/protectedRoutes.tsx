import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./authContext";

export const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (!authContext.isLoggedIn()) {
      navigate("/los/login/");
    }
  }, [navigate, authContext]);
  if (authContext.isLoggedIn()) {
    return children;
  }
  return null;
};
