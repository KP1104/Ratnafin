import { Fragment } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Alert from "@material-ui/lab/Alert";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

export const BankLoginStatusUndefined = ({
  closeDialog,
  bankLoginStatus,
  leadNo,
}) => {
  return (
    <Fragment>
      <Dialog
        open={true}
        //@ts-ignore
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <Alert severity="error">
            The Bank Login Status is {bankLoginStatus} for this LeadNo:
            {leadNo}
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
