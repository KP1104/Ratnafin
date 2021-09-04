import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { moveToLeadMetaData } from "./metadata";
import * as API from "./api";
import Dialog from "@material-ui/core/Dialog";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_los/common/dialogStyles";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (moveToLeadFn) => async ({
  data,
}: InsertFormDataFnType) => {
  return moveToLeadFn(data);
};

export const MoveToLead = ({
  moduleType,
  refID,
  isDataChangedRef,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    insertFormDataFnWrapper(API.moveToLead({ refID, moduleType })),
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
        enqueueSnackbar(
          `InquiryNo. ${data?.inquiryNo} moved to Lead with LeadNo. ${data?.leadNo}`,
          {
            variant: "success",
          }
        );
        closeDialog();
      },
    }
  );

  moveToLeadMetaData.form.refID = refID;

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
  return (
    <FormWrapper
      key="moveToLead"
      metaData={moveToLeadMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      hideDisplayModeInTitle={true}
      controlsAtBottom={true}
      formStyle={{
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Move
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

export const MoveToLeadWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
}) => {
  const dialogClasses = useDialogStyles();
  const { state: rows }: any = useLocation();
  return (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      onClose={closeDialog}
      PaperProps={{
        style: {
          width: "100%",
          minHeight: "20vh",
        },
      }}
      maxWidth="md"
      classes={{
        scrollPaper: dialogClasses.topScrollPaper,
        paperScrollBody: dialogClasses.topPaperScrollBody,
      }}
    >
      <HeaderDetails
        productData={rows[0]?.data}
        handleDialogClose={closeDialog}
      />
      <MoveToLead
        moduleType={moduleType}
        refID={rows[0].id}
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};
