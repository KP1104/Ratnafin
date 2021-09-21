import { useContext, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { SubmitFnType } from "packages/form";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { coldCallingMetadata } from "./metadata";
import { ClearCacheContext, queryClient } from "cache";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { Transition } from "pages_los/common";
import * as API from "../api";

interface ColdCallingFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const coldCallingFormDataFnWrapper = (coldCallingAddFn) => async ({
  data,
}: ColdCallingFormDataFnType) => {
  return coldCallingAddFn(data);
};

const AddColdCalling = ({ moduleType, isDataChangedRef, closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    coldCallingFormDataFnWrapper(API.addColCalling({ moduleType })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_details ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("ColdCalling Added Successfully", {
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
      key="coldCalling"
      metaData={coldCallingMetadata as MetaDataType}
      initialValues={""}
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

export const ColdCallingAddWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  moduleType,
}) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, []);
  const classes = useDialogStyles();
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
      maxWidth="lg"
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <AddColdCalling
        moduleType={moduleType}
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
      />
    </Dialog>
  );
};
