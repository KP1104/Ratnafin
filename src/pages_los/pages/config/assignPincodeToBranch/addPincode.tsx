import { useState } from "react";
import { cloneDeep } from "lodash-es";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { assignPincodeFormMetaData } from "./metadata";
import * as API from "./api";

interface AddPincodeFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const addPincodeFormDataFnWrapper = (addPincodeDataFn) => async ({
  data,
}: AddPincodeFormDataFnType) => {
  return addPincodeDataFn(data);
};

export const AddPincodeToAssignBranch = ({ closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [odd, setOdd] = useState(1);
  let oddMetadata = cloneDeep(assignPincodeFormMetaData);
  let evenMetadata = cloneDeep(assignPincodeFormMetaData);
  oddMetadata.form.name = "assignPincodeFormOdd";
  evenMetadata.form.name = "assignPincodeFormEven";

  const mutation = useMutation(
    addPincodeFormDataFnWrapper(API.getPincodeList),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(error?.error_msg?.error_details ?? "");
      },
      onSuccess: (result, { endSubmit }) => {
        endSubmit(true, "");
        enqueueSnackbar("Pincode Added successfully", { variant: "success" });
      },
    }
  );

  return odd % 2 ? (
    <FormWrapper
      key="assignPincode-odd"
      metaData={oddMetadata as MetaDataType}
      initialValues={""}
      onSubmitHandler={() => {}}
      displayMode={"new"}
      hideDisplayModeInTitle={true}
      controlsAtBottom={true}
      formStyle={{
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Button>Save</Button>
      <Button onClick={closeDialog}>Cancel</Button>
    </FormWrapper>
  ) : null;
};

export const PincodeAssignToBranchWrapper = ({ closeDialog }) => {
  return (
    <Drawer
      open={true}
      anchor="right"
      variant="temporary"
      PaperProps={{ style: { maxWidth: "465px" } }}
      onClose={closeDialog}
    >
      <AddPincodeToAssignBranch closeDialog={closeDialog} />
    </Drawer>
  );
};
