import { Fragment } from "react";
import { useMutation } from "react-query";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Alert } from "components/common/alert";
import DialogContent from "@material-ui/core/DialogContent";
import * as API from "./api";
import Dialog from "@material-ui/core/Dialog";

interface DeleteFormDataType {
  worklogID?: string;
}

const DeleteFormDataFnWrapper = (deleteFormData) => async ({
  worklogID,
}: DeleteFormDataType) => {
  return deleteFormData(worklogID);
};

export const WorklogDelete = ({
  isDataChangedRef,
  closeDialog,
  worklogID,
  moduleType,
}) => {
  const mutation = useMutation(
    DeleteFormDataFnWrapper(
      API.deleteWorkLogData({ moduleType, worklogID: worklogID })
    ),
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
            onClick={() => mutation.mutate({ worklogID })}
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

export const WorklogDeleteWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  currentAction,
}) => {
  return (
    <Dialog open={true} maxWidth="sm">
      <WorklogDelete
        worklogID={currentAction?.rows.map((one) => one.id)}
        moduleType="worklog"
        closeDialog={handleDialogClose}
        isDataChangedRef={isDataChangedRef}
      />
    </Dialog>
  );
};
