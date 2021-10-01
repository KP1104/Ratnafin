import { FC, Fragment, useCallback, useEffect, useState } from "react";
import loaderGif from "assets/images/loader.gif";
import { queryClient } from "cache";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Dialog from "@material-ui/core/Dialog";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { Alert } from "components/common/alert";
import { Transition } from "pages_los/common";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { SubmitFnType } from "packages/form";
import { campaignFormMetadata } from "../metadata";
import * as API from "../api";

interface updateCampaignDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  bankCode: string;
}

const updateCampaignFnWrapper =
  (updateCampaignData) =>
  async ({ data }: updateCampaignDataType) => {
    return updateCampaignData(data);
  };

const ViewEditCampaign: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  readOnly?: boolean;
  refID: any;
}> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  refID,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const { refetch, data, isLoading, isFetching, isError, error } = useQuery(
    ["getCampaignFormData", refID],
    () => API.getCampaignData(refID)
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getCampaignFormData", refID]);
    };
  }, []);

  const mutation = useMutation(
    updateCampaignFnWrapper(API.updateCampaignData),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        refetch();
        endSubmit(true, "");
        enqueueSnackbar("Campaign Update Successfully", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        moveToViewMode();
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
    }
  );

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    //@ts-ignore
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  //@ts-ignore
  let errorMsg = `${error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${error?.error_detail}`;

  const renderResult =
    isLoading && isFetching ? (
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
    ) : isError === true ? (
      <>
        <Alert
          severity="error"
          errorMsg={errorMsg}
          errorDetail={error_detail ?? ""}
        />
        {typeof closeDialog === "function" ? (
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            <IconButton onClick={closeDialog}>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </div>
        ) : null}
      </>
    ) : formMode === "view" ? (
      <FormWrapper
        key={`${formMode}`}
        metaData={campaignFormMetadata as MetaDataType}
        onSubmitHandler={onSubmitHandler}
        initialValues={data ?? []}
        //@ts-ignore
        displayMode={formMode}
        formStyle={{
          background: "white",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {!readOnly ? <Button onClick={moveToEditMode}>Edit</Button> : null}
        {typeof closeDialog === "function" ? (
          <Button onClick={closeDialog}>Cancel</Button>
        ) : null}
      </FormWrapper>
    ) : formMode === "edit" ? (
      <FormWrapper
        key={`${formMode}`}
        metaData={campaignFormMetadata as MetaDataType}
        onSubmitHandler={onSubmitHandler}
        initialValues={data ?? []}
        //@ts-ignore
        displayMode={formMode}
        formStyle={{
          background: "white",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Save
            </Button>
            <Button onClick={moveToViewMode} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        )}
      </FormWrapper>
    ) : null;
  return renderResult;
};

export const ViewEditCampaignWrapper = ({ isDataChangeRef, closeHandler }) => {
  const classes = useDialogStyles();
  const { state: rows }: any = useLocation();
  return (
    <Fragment>
      <Dialog
        open={true}
        maxWidth="sm"
        fullWidth
        //@ts-ignore
        TransitionComponent={Transition}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <ViewEditCampaign
          isDataChangedRef={isDataChangeRef}
          closeDialog={closeHandler}
          refID={rows[0]?.id}
        />
      </Dialog>
    </Fragment>
  );
};
