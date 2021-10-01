import { useState, Fragment, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { UserForm } from "./userForm/userForm";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import { Transition } from "pages_los/common";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { useNavigate } from "react-router-dom";
import * as API from "./api";

let insertDataWrapper = ({ data, setServerError }) => {
  return API.insertUserData(data);
};

export const AddUser = ({
  closeHandler,
  isDataChangedRef,
  goBackPath = "..",
}) => {
  const dialogClasses = useDialogStyles();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let handleDialogCloseWrapper = useCallback(() => {
    closeHandler();
    navigate(goBackPath);
  }, [navigate]);

  const mutation = useMutation(insertDataWrapper, {
    onSuccess: (result) => {
      isDataChangedRef.current = true;
      handleDialogCloseWrapper();
      enqueueSnackbar("user successfully added", {
        variant: "success",
      });
      setIsSubmitting(false);
    },
    onError: (error: any, { setServerError }) => {
      setServerError(error?.error_msg ?? "Unknown Error occured");
      setIsSubmitting(false);
    },
  });

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
      <UserForm
        mode="new"
        disabled={isSubmitting}
        initialValues={{}}
        onSubmit={(values, setServerError) => {
          setIsSubmitting(true);
          mutation.mutate({ data: values, setServerError });
        }}
      >
        {({ handleSubmit }) => {
          return (
            <Fragment>
              <Button onClick={handleSubmit}>Save</Button>
              <Button onClick={handleDialogCloseWrapper}>Cancel</Button>
            </Fragment>
          );
        }}
      </UserForm>
    </Dialog>
  );
};
