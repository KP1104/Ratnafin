import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./authContext";

export const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/los/login");
    }
  }, [navigate, isLoggedIn]);
  if (isLoggedIn()) {
    return children;
  }
  return null;
};
