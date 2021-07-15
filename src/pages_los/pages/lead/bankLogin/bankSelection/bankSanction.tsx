import { Fragment, FC, useEffect, useState } from "react";
import { queryClient } from "cache";
import { useQuery, useMutation } from "react-query";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GridMetaDataType, ActionTypes } from "components/dataTable/types";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { TextFieldForSelect } from "components/styledComponent/textfield";
import { BankSanctionGridMetaData } from "./metaData";
import * as API from "../api";

const actions: ActionTypes[] = [
  {
    actionName: "addSanctions",
    actionLabel: "Move To Sanction",
    multiple: false,
  },
];

export const BankSanction: FC<{
  refID: string;
  closeDialog: any;
  isDataChangedRef: any;
}> = ({ refID, closeDialog, isDataChangedRef }) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getBankSanction", refID]);
    };
  }, []);
  const result = useQuery<any, any>(["getBankSanction", refID], () =>
    API.getBankSelection({ refID })("sanction")
  );
  const closeMyDialog = () => {
    setCurrentAction(null);
  };

  const renderResult = (
    <Fragment>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </div>
      {result.isError ? (
        <Alert
          severity="error"
          errorMsg={result?.error?.error_msg}
          errorDetail={result?.error?.error_dtl ?? ""}
        />
      ) : null}
      <GridWrapper
        key={`externalAPIGridStatusListing`}
        finalMetaData={BankSanctionGridMetaData as GridMetaDataType}
        data={result.data ?? []}
        setData={() => null}
        loading={result.isLoading || result.isFetching}
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog open={Boolean(currentAction)} maxWidth="sm" fullWidth>
        <DialogAction
          refID={refID}
          branchID={currentAction?.rows[0].id}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
          closeMyDialog={closeMyDialog}
        />
      </Dialog>
    </Fragment>
  );

  return renderResult;
};

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

const DialogAction = ({
  refID,
  branchID,
  isDataChangedRef,
  closeDialog,
  closeMyDialog,
}) => {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const mutation = useMutation(moveToSanctionWrapper(API.moveToSanction), {
    onMutate: () => {
      setError("");
    },
    onError: (error: any) => {},
    onSuccess: (data) => {
      setRemarks("");
      setError("");
      isDataChangedRef.current = true;
      closeMyDialog();
      closeDialog();
    },
  });
  return (
    <Fragment>
      {mutation.isError ? (
        <Alert
          severity="error"
          errorMsg={mutation?.error?.error_msg}
          errorDetail={mutation?.error?.error_detail}
        />
      ) : null}
      <DialogTitle>
        Are you sure you want to move the selected bank to Sanction?
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (!Boolean(remarks)) {
              setError("This is a required field");
            } else {
              mutation.mutate({ refID, branchID, remarks });
            }
          }}
          disabled={mutation.isLoading}
          endIcon={mutation.isLoading ? <CircularProgress size={20} /> : null}
        >
          Yes
        </Button>
        <Button onClick={closeMyDialog} disabled={mutation.isLoading}>
          No
        </Button>
      </DialogActions>
    </Fragment>
  );
};
