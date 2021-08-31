import { useState } from "react";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as API from "./api";

interface RejectLeadFnType {
  remarks?: string;
}

const rejectLeadFnWrapper = (rejectLeadFn) => async ({
  remarks,
}: RejectLeadFnType) => {
  return rejectLeadFn(remarks);
};

export const LeadReject = ({ open, closeDialog, setShowDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const mutation = useMutation(rejectLeadFnWrapper(API.rejectLead()), {
    onMutate: () => {
      setError("");
    },
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
    },

    onSuccess: (data) => {
      setRemarks("");
      setError("");
      enqueueSnackbar("Inquiry has been Rejected", {
        variant: "success",
      });
      closeDialog();
    },
  });

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle id="simple-dialog-title">Reject Lead</DialogTitle>
      <DialogContent>
        <TextField
          key="rejetLead"
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
                remarks,
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
