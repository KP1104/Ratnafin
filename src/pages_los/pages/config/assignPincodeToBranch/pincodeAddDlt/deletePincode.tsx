import { Fragment } from "react";
import { useMutation } from "react-query";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Alert } from "components/common/alert";
import DialogContent from "@material-ui/core/DialogContent";
import * as API from "../api";
import Dialog from "@material-ui/core/Dialog";

interface DeleteFormDataType {
  pincode?: string;
}

const DeleteFormDataFnWrapper =
  (deleteFormData) =>
  async ({ pincode }: DeleteFormDataType) => {
    return deleteFormData(pincode);
  };

const PincodeDelete = ({ closeDialog, pincode, isDataChangedRef }) => {
  const mutation = useMutation(
    DeleteFormDataFnWrapper(API.deletePincode({ pincode })),
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
            onClick={() => mutation.mutate({ pincode })}
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

export const PincodeDeleteWrapper = ({
  closeDialog,
  currentAction,
  isDataChangedRef,
}) => {
  return (
    <Dialog open={true} maxWidth="sm">
      <PincodeDelete
        pincode={currentAction?.rows.map((one) => one.id)}
        closeDialog={closeDialog}
        isDataChangedRef={isDataChangedRef}
      />
    </Dialog>
  );
};
