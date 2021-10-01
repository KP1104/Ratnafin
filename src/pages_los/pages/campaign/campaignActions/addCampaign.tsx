import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import { useMutation } from "react-query";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { campaignFormMetadata } from "../metadata";
import * as API from "../api";
import { CircularProgress } from "@material-ui/core";

interface addCampaign {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const addCampaignFnWrapper =
  (addCampaignFn) =>
  async ({ data }: addCampaign) => {
    return addCampaignFn(data);
  };

const AddCampaign = ({ isDataChangeRef, closeHandler }) => {
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(addCampaignFnWrapper(API.addCampaignData), {
    onError: (error: any, { endSubmit }) => {
      endSubmit(
        false,
        error?.error_msg,
        error?.error_details ?? "Unknown error occured"
      );
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      isDataChangeRef.current = true;
      enqueueSnackbar("Campaign Added Successfully", { variant: "success" });
      closeHandler();
    },
  });

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
      key="addCampaign"
      metaData={campaignFormMetadata as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      displayMode="new"
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
            <Button onClick={closeHandler} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export const AddCampaignWrapper = ({ isDataChangeRef, closeHandler }) => {
  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <AddCampaign
        isDataChangeRef={isDataChangeRef}
        closeHandler={closeHandler}
      />
    </Dialog>
  );
};
