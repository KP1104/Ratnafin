import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { reInitiateVerificationAPI } from "../api";

interface ReInitiateVerificationAPIType {
  requestType: any;
  transactionID: any;
}

const ReInitiateVerificationAPIWrapper = (reInitiateVerificationAPI) => async ({
  requestType,
  transactionID,
}: ReInitiateVerificationAPIType) => {
  return reInitiateVerificationAPI({ requestType, transactionID });
};

export const ReInitiate = ({
  moduleType,
  closeDialog,
  row,
  isDataChangedRef,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const requestType = row?.data?.requestType;
  const transactionID = row?.data?.tokenID;

  useEffect(() => {
    mutation.mutate({ requestType, transactionID });
  }, [requestType, transactionID]);

  const mutation = useMutation(
    ReInitiateVerificationAPIWrapper(reInitiateVerificationAPI),
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          enqueueSnackbar(error?.error_msg ?? errorMsg, {
            variant: "error",
          });
        }
        closeDialog();
      },
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        enqueueSnackbar("Request has been Re-Initiated", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  return null;
};
