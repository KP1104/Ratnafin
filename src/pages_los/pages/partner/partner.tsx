import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { SubmitFnType } from "packages/form";
import { becomePartnerMetaData } from "./metadata/form";
import * as API from "./api";

interface BecomePartnerFormProps {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const partnerFormDataFnWrapper = (partnerFn) => async ({
  data,
}: BecomePartnerFormProps) => {
  return partnerFn(data);
};

const BecomePartnerForm = ({ metaData }) => {
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(
    partnerFormDataFnWrapper(API.submitBecomePartnerData()),
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
        enqueueSnackbar("Task Assign Successfully", {
          variant: "success",
        });
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
      key="becomePartner"
      metaData={becomePartnerMetaData as MetaDataType}
      initialValues={""}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
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
          </>
        );
      }}
    </FormWrapper>
  );
};

export const BecomePartnerFormWrapper = () => {
  return <BecomePartnerForm metaData={becomePartnerMetaData} />;
};
