import { useState } from "react";
import { cloneDeep } from "lodash-es";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { assignPincodeFormMetaData } from "../metadata";
import * as API from "../api";

interface AddPincodeFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const addPincodeFormDataFnWrapper =
  (addPincodeDataFn) =>
  async ({ data }: AddPincodeFormDataFnType) => {
    return addPincodeDataFn(data);
  };

export const AddPincodeToAssignBranch = ({
  closeDialog,
  refetchData,
  isDataChangedRef,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [odd, setOdd] = useState(1);
  let oddMetadata = cloneDeep(assignPincodeFormMetaData);
  let evenMetadata = cloneDeep(assignPincodeFormMetaData);
  oddMetadata.form.name = "assignPincodeFormOdd";
  evenMetadata.form.name = "assignPincodeFormEven";

  const mutation = useMutation(
    addPincodeFormDataFnWrapper(API.addPincodeToAssignBranch),
    {
      onError: (error: any, { endSubmit }) => {
        endSubmit(
          false,
          error?.error_msg ?? "Unknown error occured",
          error?.error_msg?.error_details ?? ""
        );
      },
      onSuccess: (result, { endSubmit }) => {
        endSubmit(true, "");
        enqueueSnackbar("Pincode Added successfully", { variant: "success" });
        setOdd((old) => {
          return old + 1;
        });
        // typeof refetchData === "function" && refetchData();
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

  return odd % 2 ? (
    <FormWrapper
      key="assignPincode-odd"
      metaData={oddMetadata as MetaDataType}
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
            <Button onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  ) : (
    <FormWrapper
      key="assignPincode-even"
      metaData={evenMetadata as MetaDataType}
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
            <Button onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export const PincodeAssignToBranchWrapper = ({
  closeDialog,
  refetchData,
  isDataChangedRef,
}) => {
  return (
    <Drawer
      open={true}
      anchor="right"
      variant="temporary"
      PaperProps={{ style: { maxWidth: "465px" } }}
      onClose={closeDialog}
    >
      <AddPincodeToAssignBranch
        closeDialog={closeDialog}
        refetchData={refetchData}
        isDataChangedRef={isDataChangedRef}
      />
    </Drawer>
  );
};
