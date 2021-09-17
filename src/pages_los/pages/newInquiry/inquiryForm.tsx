import { useMutation } from "react-query";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as API from "./api";
import { Alert } from "components/common/alert";

interface InsertFormDataFnType {
  data: object;
  productID: string;
  categoryID: string;
  endSubmit?: any;
}

const insertFormDataFnWrapper = async ({
  data,
  productID,
  categoryID,
}: InsertFormDataFnType) => {
  return API.submitInquiryData({ ...data, productID, categoryID });
};

export const InquiryFormWrapper = ({ onSuccess, categoryID, productID }) => {
  const mutation = useMutation(insertFormDataFnWrapper, {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg, error?.error_detail ?? "");
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      if (typeof onSuccess === "function") {
        onSuccess(data?.inquiryNo);
      }
    },
  });
  const onSubmitHandler = (data, displayValues, endSubmit) => {
    mutation.mutate({
      data,
      productID,
      categoryID,
      endSubmit,
    });
  };
  let metaData: any = {};
  try {
    metaData = API.getInquiryQuestionMetaData(productID);

    if (metaData?.form?.render?.renderType === "stepper") {
      metaData.form.render.renderType = "tabs";
    }
  } catch (e: any) {
    return (
      <Alert
        variant="outlined"
        severity="error"
        errorMsg={e?.error_msg ?? ""}
      />
    );
  }

  return (
    <FormWrapper
      //@ts-ignore
      metaData={metaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      controlsAtBottom={true}
      formStyle={{
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "24px",
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
              Submit
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};
