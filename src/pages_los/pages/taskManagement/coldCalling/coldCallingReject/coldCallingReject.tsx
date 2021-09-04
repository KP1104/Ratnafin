import { useState } from "react";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Alert } from "components/common/alert";
import * as API from "./api";

interface RejectColdCallingFnType {
  coldCallingNo: any;
  remarks?: string;
}

const rejectColdCallingFnWrapper = (rejectColdCallingFn) => async ({
  coldCallingNo,
  remarks,
}: RejectColdCallingFnType) => {
  return rejectColdCallingFn({ coldCallingNo, remarks });
};

export const ColdCallingReject = ({
  open,
  closeDialog,
  setShowDialog,
  coldCallingNo,
  isDataChangedRef,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const mutation = useMutation(
    rejectColdCallingFnWrapper(API.rejectColdCalling),
    {
      onMutate: () => {
        setError("");
      },
      onError: (error: any) => {},
      onSuccess: (data) => {
        setRemarks("");
        setError("");
        enqueueSnackbar("Cold-Calling has been Rejected", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        closeDialog();
      },
    }
  );
  console.log(mutation);
  return (
    <Dialog open={open} fullWidth>
      {mutation?.isError ? (
        <Alert
          severity="error"
          errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
          errorDetail={mutation.error?.error_detail ?? ""}
        />
      ) : null}
      <DialogTitle id="simple-dialog-title">Reject ColdCalling</DialogTitle>
      <DialogContent>
        <TextField
          key="rejetColdCalling"
          label="Remark"
          type="textarea"
          multiline={true}
          placeholder="Enter Remark"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          name="remark"
          onChange={(e) => setRemarks(e.target.value)}
          error={Boolean(error)}
          helperText={error}
          value={remarks}
          autoFocus={true}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            handleDialogClose();
            setRemarks("");
            setError("");
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (!Boolean(remarks)) {
              setError("This is a required field");
            } else {
              mutation.mutate({
                coldCallingNo: coldCallingNo,
                remarks: remarks,
              });
            }
          }}
          autoFocus
        >
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};
