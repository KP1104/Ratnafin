import { useContext, useRef, useEffect, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { leadAssignMetadata } from "./metadata";
import * as API from "./api";
import { cacheWrapperKeyGen, ClearCacheContext } from "cache";
import {
  LeadAssignAPIContext,
  LeadAssignAPIProvider,
  generateLeadAssignAPIContext,
} from "./context";
import Dialog from "@material-ui/core/Dialog";
import { useLocation } from "react-router-dom";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import loaderGif from "assets/images/loader.gif";
import { useDialogStyles } from "pages_los/common/dialogStyles";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (leadAssignFn) => async ({
  data,
}: InsertFormDataFnType) => {
  return leadAssignFn(data);
};

export const LeadAssign = ({
  moduleType,
  refID,
  isDataChangedRef,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  const { getCurrentLeadAssign, context } = useContext(LeadAssignAPIContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(getCurrentLeadAssign.args)
    );
  }

  useEffect(() => {
    removeCache?.addEntry(["getCurrentLeadAssign", wrapperKey.current]);
  }, [removeCache]);

  const queryData = useQuery<any, any, any>(
    ["getCurrentLeadAssign", wrapperKey.current],
    getCurrentLeadAssign.fn(getCurrentLeadAssign.args),
    { cacheTime: 0 }
  );

  const mutation = useMutation(
    insertFormDataFnWrapper(API.leadAssign({ moduleType, inquiry: refID })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("lead successfully assigned", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  leadAssignMetadata.form.formState = context;

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    mutation.mutate({
      data,
      displayData,
      endSubmit,
      setFieldError,
    });
  };

  return queryData.isLoading || queryData.isFetching ? (
    <Fragment>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </Fragment>
  ) : queryData.isError ? (
    <Fragment>
      <span>{queryData.error?.error_msg ?? "Unknown error occured"}</span>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </Fragment>
  ) : (
    <FormWrapper
      key="leadInquiry"
      metaData={leadAssignMetadata as MetaDataType}
      initialValues={queryData.data}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      hideDisplayModeInTitle={true}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Save
            </Button>
            <Button onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export const LeadAssignWrapper = ({
  moduleType,
  isDataChangedRef,
  handleDialogClose,
}) => {
  const { state: rows }: any = useLocation();
  const classes = useDialogStyles();
  return (
    <LeadAssignAPIProvider
      {...generateLeadAssignAPIContext({ refID: rows?.[0].id, moduleType })}
    >
      <Dialog
        maxWidth="md"
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        PaperProps={{ style: { width: "100%", minHeight: "20vh" } }}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <HeaderDetails
          rowData={rows?.[0]}
          handleDialogClose={handleDialogClose}
          isDataChangedRef={isDataChangedRef}
        />
        <LeadAssign
          moduleType={moduleType}
          refID={rows[0].id}
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
        />
      </Dialog>
    </LeadAssignAPIProvider>
  );
};
