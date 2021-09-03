import { Fragment, FC, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Alert } from "components/common/alert";
import DialogContent from "@material-ui/core/DialogContent";
import { useLocation } from "react-router-dom";
import { Transition } from "pages_los/common/transition";
import * as API from "../api";

interface DeleteFormDataType {
  tran_cd?: string;
}

const DeleteFormDataFnWrapper = (deleteFormData) => async ({
  tran_cd,
}: DeleteFormDataType) => {
  return deleteFormData(tran_cd);
};

const ColdCallingDelete = ({
  isDataChangedRef,
  closeDialog,
  tran_cd,
  moduleType,
}) => {
  const mutation = useMutation(
    DeleteFormDataFnWrapper(API.deleteColdCalligData({ moduleType, tran_cd })),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        closeDialog();
      },
    }
  );

  return (
    <Fragment>
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete the selected Records
      </DialogTitle>
      {mutation.isLoading ? (
        <DialogContent>Deleting...</DialogContent>
      ) : mutation?.isError ? (
        <DialogContent>
          <Alert
            severity="error"
            errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
            errorDetail={mutation.error?.error_detail ?? ""}
          />
        </DialogContent>
      ) : mutation.isSuccess ? (
        <DialogContent>All Records successfully deleted</DialogContent>
      ) : null}
      {mutation.isSuccess ? (
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button
            onClick={closeDialog}
            color="primary"
            disabled={mutation.isLoading}
          >
            Disagree
          </Button>
          <Button
            onClick={() => mutation.mutate({ tran_cd })}
            color="primary"
            disabled={mutation.isLoading}
          >
            Agree
          </Button>
        </DialogActions>
      )}
    </Fragment>
  );
};

export const ColdCallingDeleteWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  moduleType,
}) => {
  const { state: rows }: any = useLocation();
  return (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
      maxWidth="sm"
    >
      <ColdCallingDelete
        moduleType={moduleType}
        isDataChangedRef={isDataChangedRef}
        tran_cd={rows.map((one) => one.id)}
        closeDialog={handleDialogClose}
      />
    </Dialog>
  );
};
