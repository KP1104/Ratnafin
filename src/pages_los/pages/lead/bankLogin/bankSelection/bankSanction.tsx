import { Fragment, FC, useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SelectRenderOnly } from "components/common/select";
import { TextFieldForSelect } from "components/styledComponent/textfield";
import { getValidateValue } from "registry/fns/misc/others";
import * as API from "../api";

interface moveToSanctionFnType {
  refID: any;
  remarks: any;
  branchID: any;
}

const moveToSanctionWrapper = (moveToSanctionFn) => async ({
  refID,
  branchID,
  remarks,
}: moveToSanctionFnType) => {
  return moveToSanctionFn({ refID, branchID, remarks });
};

export const BankSanction: FC<{
  refID: string;
  closeDialog: any;
  isDataChangedRef: any;
}> = ({ refID, closeDialog, isDataChangedRef }) => {
  const [bank, setBank] = useState<any>("00");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [bankError, setBankError] = useState<any>("");

  const handleChange = (e) => {
    setBank(e.target.value);
  };

  const handleBlur = async () => {
    let result = await getValidateValue({
      value: bank,
    });
    if (Boolean(result)) {
      setBankError(result);
    } else {
      setBankError("");
    }
  };

  const mutation = useMutation(moveToSanctionWrapper(API.moveToSanction), {
    onMutate: () => {
      setError("");
    },
    onError: (error: any) => {},
    onSuccess: (data) => {
      setRemarks("");
      setError("");
      isDataChangedRef.current = true;
      closeDialog();
    },
  });

  return (
    <Fragment>
      <DialogTitle>Bank Sanction</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} md={6} sm={6}>
            <SelectRenderOnly
              name="sanction"
              size="small"
              margin="normal"
              required
              fullWidth
              label="Select Bank for Sanction"
              options={() => API.getBankSanction({ refID })}
              value={bank ?? ""}
              autoComplete="off"
              handleChange={handleChange}
              _optionsKey="getBankSanction"
              handleBlur={handleBlur}
              defaultOptionLabel="Select Bank"
              disableCaching={true}
              error={bankError}
              autoFocus={true}
              touched={true}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <TextFieldForSelect
              rows={3}
              type="textarea"
              multiline={true}
              InputLabelProps={{ shrink: true }}
              fullWidth={true}
              label="Remarks"
              onChange={(e) => setRemarks(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              value={remarks}
              required={true}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (!Boolean(remarks)) {
              setError("This is a required field");
            } else {
              mutation.mutate({
                refID,
                branchID: bank,
                remarks,
              });
            }
          }}
          disabled={mutation.isLoading}
          endIcon={mutation.isLoading ? <CircularProgress size={20} /> : null}
        >
          Proceed
        </Button>
        <Button onClick={closeDialog} disabled={mutation.isLoading}>
          Cancel
        </Button>
      </DialogActions>
    </Fragment>
  );
};
