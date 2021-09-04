import { useContext, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { leadTaskAssignMetadata } from "./metadata";
import * as API from "./api";
import { SubmitFnType } from "packages/form";
import { ClearCacheContext, queryClient } from "cache";
import Dialog from "@material-ui/core/Dialog";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_los/common/dialogStyles";
interface TaskAssignFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const taskAssignFormDataFnWrapper = (taskAssignFn) => async ({
  data,
}: TaskAssignFormDataFnType) => {
  return taskAssignFn(data);
};

export const LeadAssignTask = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  leadNo,
  taskFor,
  trancdCode,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  const mutation = useMutation(
    taskAssignFormDataFnWrapper(API.assignTask({ moduleType })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          Error = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_details ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("Task Assign Successfully", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  return (
    <FormWrapper
      key="assign"
      metaData={leadTaskAssignMetadata as MetaDataType}
      initialValues={{ taskFor: taskFor, leadID: leadNo, refID: trancdCode }}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      hideDisplayModeInTitle={true}
      formStyle={{
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      controlsAtBottom={true}
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

export const LeadAssignTaskWrapper = ({
  handleDialogClose,
  isDataChangedRef,
}) => {
  const dialogClasses = useDialogStyles();
  const { state: rows }: any = useLocation();
  return (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      PaperProps={{
        style: {
          width: "100%",
          minHeight: "20vh",
        },
      }}
      maxWidth="sm"
      classes={{
        scrollPaper: dialogClasses.topScrollPaper,
        paperScrollBody: dialogClasses.topPaperScrollBody,
      }}
    >
      <HeaderDetails
        rowData={rows?.[0]}
        handleDialogClose={handleDialogClose}
        isDataChangedRef={isDataChangedRef}
      />
      <LeadAssignTask
        leadNo={rows[0]?.data?.lead_no}
        trancdCode={rows[0]?.data?.tran_cd}
        taskFor="lead"
        moduleType="task"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
      />
    </Dialog>
  );
};
