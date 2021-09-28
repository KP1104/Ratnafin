import { Fragment } from "react";
import { useMutation } from "react-query";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Alert } from "components/common/alert";
import DialogContent from "@material-ui/core/DialogContent";
import { Transition } from "pages_los/common/transition";
import * as API from "../api";

interface DeleteFormDataType {
  code?: string;
  subCode: string;
}

const DeleteFormDataFnWrapper =
  (deleteFormData) =>
  async ({ code, subCode }: DeleteFormDataType) => {
    return deleteFormData(code, subCode);
  };

const SubMasterDelete = ({
  isDataChangedRef,
  closeDialog,
  code,
  moduleType,
  subCode,
}) => {
  const mutation = useMutation(
    DeleteFormDataFnWrapper(
      API.deleteBranchData({ moduleType, code, subCode })
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
            onClick={() => mutation.mutate({ code, subCode })}
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

export const SubMasterDeleteWrapper = ({
  closeDialog,
  isDataChangedRef,
  moduleType,
  details,
}) => {
  return (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <SubMasterDelete
        moduleType={moduleType}
        isDataChangedRef={isDataChangedRef}
        code={details[0]?.data?.code}
        subCode={details.map((one) => one?.id)}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};
