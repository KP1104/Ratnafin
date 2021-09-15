import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router";
import { LOSSDK } from "registry/fns/los";
import { queryClient } from "cache";
import { AuthContextType, AuthStateType, ActionType } from "./type";
import * as API from "./api";
import LinearProgress from "@material-ui/core/LinearProgress";

const inititalState: AuthStateType = {
  token: "",
  tokenType: "",
  isLoggedIn: false,
  role: "",
  roleName: "",
  branchAccess: {},
  user: {
    branch: "",
    branchCode: "",
    lastName: "",
    firstName: "",
    middleName: "",
    lastLogin: "",
    type: "",
    id: "",
  },
};

const authReducer = (
  state: AuthStateType,
  action: ActionType
): AuthStateType => {
  switch (action.type) {
    case "login": {
      return action.payload;
    }
    case "logout": {
      return inititalState;
    }
    default: {
      return state;
    }
  }
};

export const AuthContext = createContext<AuthContextType>({
  login: () => true,
  logout: () => true,
  isLoggedIn: () => false,
  authState: inititalState,
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inititalState);
  const [authenticating, setAuthenticating] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [comingFromRoute, setComingFromRoute] = useState(location.pathname);

  /*eslint-disable react-hooks/exhaustive-deps*/
  const login = useCallback(
    (payload: AuthStateType) => {
      dispatch({
        type: "login",
        payload: { ...payload, isLoggedIn: true },
      });
      LOSSDK.setToken(payload.token);
      localStorage.setItem(
        "authDetails",
        JSON.stringify({ ...payload, isLoggedIn: true })
      );
      if (comingFromRoute === "/los/login") {
        navigate("/los", {
          replace: true,
        });
      } else {
        navigate(comingFromRoute, {
          replace: true,
        });
      }
      setComingFromRoute("/los");
    },
    [dispatch, navigate]
  );
  const logout = useCallback(() => {
    localStorage.removeItem("authDetails");
    dispatch({
      type: "logout",
      payload: {},
    });
    LOSSDK.removeToken();
    queryClient.clear();
    navigate("/los/login");
  }, [dispatch, navigate]);

  const isLoggedIn = () => {
    return state.isLoggedIn;
  };

  window.addEventListener("storage", () => {
    let result = localStorage.getItem("authDetails");
    if (result === null) {
      logout();
    }
  });

  useEffect(() => {
    //@ts-ignore
    window.__logout = logout;
    return () => {
      //@ts-ignore
      window.__logout = null;
    };
  }, [logout]);

  useEffect(() => {
    let result = localStorage.getItem("authDetails");
    if (result !== null) {
      let localStorageAuthState: AuthStateType = JSON.parse(result);
      if (Boolean(localStorageAuthState?.token ?? "")) {
        API.verifyToken(localStorageAuthState.token).then((result) => {
          if (result.status === "success") {
            login(localStorageAuthState);
          } else if (result.status === "failure") {
            if (result.data instanceof Error) {
              navigate("/error/Internet");
            } else {
              logout();
            }
          }
          setAuthenticating(false);
        });
      } else {
        logout();
        setAuthenticating(false);
      }
    } else {
      logout();
      setAuthenticating(false);
    }
  }, [login, logout, setAuthenticating]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        authState: state,
      }}
    >
      {authenticating ? <LinearProgress color="secondary" /> : children}
    </AuthContext.Provider>
  );
};
