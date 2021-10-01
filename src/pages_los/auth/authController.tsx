import { useReducer, useContext, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { useNavigate } from "react-router-dom";
import loginImg from "assets/images/login.svg";
import { useStyles } from "./style";
import { UsernameField } from "./username";
import { PasswordField } from "./password";
import { AuthContext } from "./authContext";
import * as API from "./api";
import logo from "assets/images/logo.svg";

const inititalState = {
  username: "",
  firstName: "",
  lastName: "",
  loading: false,
  isError: false,
  userMessage: "",
  currentFlow: "username",
  transactionID: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUsername": {
      return { ...state, username: action.payload.data };
    }
    case "setPassword": {
      return { ...state, password: action.payload.data };
    }
    case "inititateUserNameVerification":
    case "inititatePasswordVerification": {
      return {
        ...state,
        loading: true,
        isError: false,
        userMessage: "",
      };
    }
    case "passwordVerificationFailure":
    case "usernameVerificationFailure": {
      return {
        ...state,
        loading: false,
        isError: true,
        userMessage: action?.payload?.error,
      };
    }
    case "usernameVerificationSuccessful": {
      return {
        ...state,
        loading: false,
        currentFlow: "password",
        transactionID: action?.payload?.transactionID,
        username: action?.payload?.username,
        firstName: action?.payload?.firstName,
        lastName: action?.payload?.lastName,
      };
    }
    case "passwordVerificationSuccessful": {
      return { ...state, loading: false };
    }
    case "backToUsernameVerification": {
      return inititalState;
    }
    default: {
      return state;
    }
  }
};

export const AuthLoginController = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [loginState, dispath] = useReducer(reducer, inititalState);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/los", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  const verifyUsername = async (username) => {
    if (!Boolean(username)) {
      dispath({
        type: "usernameVerificationFailure",
        payload: { error: "This is a required" },
      });
      return;
    }
    dispath({ type: "inititateUserNameVerification" });
    try {
      const result = await API.veirfyUsername(username);
      if (result.status === "success") {
        dispath({
          type: "usernameVerificationSuccessful",
          payload: {
            transactionID: result?.data?.transactionId,
            username: username,
            firstName: result?.data?.firstName,
            lastName: result?.data?.lastName,
          },
        });
      } else {
        dispath({
          type: "usernameVerificationFailure",
          payload: {
            error: result?.data?.error_msg ?? "Unknown error occured",
          },
        });
      }
    } catch (e: any) {
      dispath({
        type: "usernameVerificationFailure",
        payload: {
          error: e?.message ?? "Unknown error occured",
        },
      });
    }
  };

  const verifyPassword = async (password) => {
    if (!Boolean(password)) {
      dispath({
        type: "passwordVerificationFailure",
        payload: { error: "This is a required Field" },
      });
      return;
    }
    dispath({ type: "inititatePasswordVerification" });
    try {
      const result = await API.verifyPasswordAndLogin(
        loginState.transactionID,
        loginState.username,
        password
      );
      if (result.status === "success") {
        dispath({ type: "passwordVerificationSuccessful" });
        login(result.data);
      } else {
        dispath({
          type: "passwordVerificationFailure",
          payload: {
            error: result?.data?.error_msg ?? "Unknown error occured",
          },
        });
      }
    } catch (e: any) {
      console.log(e);
      dispath({
        type: "passwordVerificationFailure",
        payload: {
          error: e?.message ?? "Unknown error occured",
        },
      });
    }
  };

  const changeUserName = () => {
    dispath({
      type: "backToUsernameVerification",
    });
  };

  return (
    <Box display="flex" width={1} className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginLeft}
      >
        <img alt="" src={loginImg} className={classes.loginImg} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginRight}
      >
        <img src={logo} alt="Logo" width="100px" height="100px" />
        <h2>Employee Login</h2>
        {loginState.currentFlow === "username" ? (
          <UsernameField
            key="username"
            classes={classes}
            loginState={loginState}
            verifyUsername={verifyUsername}
          />
        ) : (
          <PasswordField
            key="password"
            classes={classes}
            loginState={loginState}
            verifyPassword={verifyPassword}
            goBack={changeUserName}
          />
        )}
      </Box>
    </Box>
  );
};
