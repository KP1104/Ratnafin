import { useState } from "react";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { TextField } from "components/styledComponent/textfield";
import { Alert } from "components/common/alert";
import * as API from "./api";

interface RejectLeadFnType {
  leadNo: any;
  remarks?: string;
}

const rejectLeadFnWrapper = (rejectLeadFn) => async ({
  leadNo,
  remarks,
}: RejectLeadFnType) => {
  return rejectLeadFn({ leadNo, remarks });
};

export const LeadReject = ({
  open,
  closeDialog,
  setShowDialog,
  leadNo,
  isDataChangedRef,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const mutation = useMutation(rejectLeadFnWrapper(API.rejectLead), {
    onMutate: () => {
      setError("");
    },
    onError: (error: any) => {},
    onSuccess: (data) => {
      setRemarks("");
      setError("");
      enqueueSnackbar("Lead has been Inactive", {
        variant: "success",
      });
      isDataChangedRef.current = true;
      closeDialog();
    },
  });

  return (
    <Dialog open={open} fullWidth>
      {mutation?.isError ? (
        <Alert
          severity="error"
          errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
          errorDetail={mutation.error?.error_detail ?? ""}
        />
      ) : null}
      <DialogTitle id="simple-dialog-title">Reject Lead</DialogTitle>
      <DialogContent>
        <TextField
          key="rejetLead"
          label="Remark"
          type="text"
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
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            if (!Boolean(remarks)) {
              setError("This is a required field");
            } else {
              mutation.mutate({
                leadNo: leadNo,
                remarks: remarks,
              });
            }
          }}
          autoFocus
        >
          Reject
        </Button>
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
      </DialogActions>
    </Dialog>
  );
};
