import { useState, Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import loaderGif from "assets/images/loader.gif";
import IconButton from "@material-ui/core/IconButton";
import { UserForm } from "./userForm/userForm";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import { Transition } from "pages_los/common";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import * as API from "./api";
import { useLocation } from "react-router";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { queryClient } from "cache";

let updateUserDataWrapper = ({ data, setServerError }) => {
  return API.updateUserData(data);
};

export const ViewEditUser = ({ closeHandler, isDataChangedRef }) => {
  const { state: rows }: any = useLocation();
  const userID = rows[0]?.id;
  const dialogClasses = useDialogStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [mode, setMode] = useState("view");

  const userData = useQuery(
    ["getUsersData", { userID: userID }],
    API.getUsersData
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getUsersData", { userID: userID }]);
    };
  }, []);

  const mutation = useMutation(updateUserDataWrapper, {
    onSuccess: (data) => {
      isDataChangedRef.current = true;
      setMode("view");
      enqueueSnackbar("user successfully updated", {
        variant: "success",
      });
      setIsSubmitting(false);
      userData.refetch();
    },
    onError: (error: any, { setServerError }) => {
      setIsSubmitting(false);
      setServerError(error?.error_msg ?? "Unknown Error occured");
    },
  });

  const moveToEdit = () => {
    setMode("edit");
  };
  const moveToView = () => {
    setMode("view");
  };

  return (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "100%",
          minHeight: "20vh",
        },
      }}
      maxWidth="md"
      classes={{
        scrollPaper: dialogClasses.topScrollPaper,
        paperScrollBody: dialogClasses.topPaperScrollBody,
      }}
    >
      {userData.isFetching || userData.isLoading ? (
        <div>
          <img src={loaderGif} alt="loader" width="50px" height="50px" />
          {typeof closeHandler === "function" ? (
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={closeHandler}>
                <HighlightOffOutlinedIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
      ) : (
        <UserForm
          mode={mode}
          key={mode}
          disabled={mode === "view" ? true : isSubmitting}
          initialValues={userData.data ?? {}}
          onSubmit={(values, setServerError) => {
            setIsSubmitting(true);
            mutation.mutate({ data: values, setServerError });
          }}
        >
          {({ handleSubmit }) => {
            return mode === "view" ? (
              <Fragment>
                <Button onClick={moveToEdit}>Edit</Button>
                <Button onClick={closeHandler}>Cancel</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={moveToView}>Cancel</Button>
              </Fragment>
            );
          }}
        </UserForm>
      )}
    </Dialog>
  );
};
