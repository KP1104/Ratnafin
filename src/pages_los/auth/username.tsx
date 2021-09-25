import { Fragment, useCallback, useState, useEffect, useRef } from "react";
import { TextField } from "components/styledComponent/textfield";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GradientButton } from "components/styledComponent/button";

export const UsernameField = ({ classes, loginState, verifyUsername }) => {
  const [userName, setUsername] = useState("");
  const handleChange = useCallback(
    (e) => setUsername(e.target.value),
    [setUsername]
  );
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (loginState.isError) {
      setTimeout(() => {
        inputRef?.current?.focus?.();
      }, 0);
    }
  }, [loginState.isError]);

  return (
    <Fragment>
      <div className="text">Login with your registered userID</div>
      <div className={classes.formWrap}>
        <TextField
          inputRef={inputRef}
          autoFocus={true}
          label={"Username"}
          fullWidth
          type={"text"}
          className="mobileNumber"
          name="userName"
          value={userName}
          onChange={handleChange}
          onKeyDown={(e) => e.keyCode === 13 && verifyUsername(userName)}
          error={loginState.isError}
          helperText={loginState.isError ? loginState.userMessage : ""}
          InputLabelProps={{ shrink: true }}
          disabled={loginState.loading}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "8px",
          }}
        >
          <GradientButton
            disabled={loginState.loading}
            endIcon={loginState.loading ? <CircularProgress size={20} /> : null}
            onClick={() => verifyUsername(userName)}
          >
            Next
          </GradientButton>
        </div>
      </div>
    </Fragment>
  );
};
