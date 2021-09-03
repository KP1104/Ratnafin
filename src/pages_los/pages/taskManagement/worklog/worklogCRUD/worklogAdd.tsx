import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { worklogFormMetaData } from "../metadata";
import * as API from "./api";
import { useState } from "react";
import { cloneDeep } from "lodash-es";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

interface AddWorkLogFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const addWorklogFormDataFnWrapper = (insertWorkLogDataFn) => async ({
  data,
}: AddWorkLogFormDataFnType) => {
  return insertWorkLogDataFn(data);
};

export const WorklogAdd = ({ moduleType, closeDialog, refetchData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [odd, setOdd] = useState(1);

  const mutation = useMutation(
    addWorklogFormDataFnWrapper(API.insertWorkLogData({ moduleType })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_details ?? "");
      },
      onSuccess: (result, { endSubmit }) => {
        endSubmit(true, "");
        enqueueSnackbar("Worklog Added Successfully", {
          variant: "success",
        });
        setOdd((old) => {
          return old + 1;
        });
        typeof refetchData === "function" && refetchData();
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
  let oddMetaData = cloneDeep(worklogFormMetaData);
  let evenMetaData = cloneDeep(worklogFormMetaData);
  oddMetaData.form.name = "worklogFormOdd";
  evenMetaData.form.name = "worklogFormEven";

  return odd % 2 ? (
    <FormWrapper
      key="worklog-odd"
      metaData={oddMetaData as MetaDataType}
      initialValues={""}
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
              Save
            </Button>
          </>
        );
      }}
    </FormWrapper>
  ) : (
    <FormWrapper
      key="worklog-even"
      metaData={evenMetaData as MetaDataType}
      initialValues={""}
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
              Save
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export const WorklogAddWrapper = ({ handleDialogClose, refetchData }) => {
  return (
    <Drawer
      open={true}
      anchor="right"
      variant="temporary"
      PaperProps={{
        style: { maxWidth: "465px" },
      }}
      onClose={handleDialogClose}
    >
      <WorklogAdd
        moduleType="worklog"
        closeDialog={handleDialogClose}
        refetchData={refetchData}
      />
      <Typography
        variant="subtitle2"
        component="i"
        style={{ padding: "8px 24px" }}
      >
        Note : You can keep adding worklogs and when you want to exit just click
        outside this form or press <i>ESC</i>
      </Typography>
    </Drawer>
  );
};
