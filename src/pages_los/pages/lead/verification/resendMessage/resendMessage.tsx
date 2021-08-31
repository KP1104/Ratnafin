import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { reSendMessage } from "../api";

interface ResendSMSAPIType {
  requestType: any;
  transactionID: any;
}

const ReSendSmsAPIWrapper = (resendMsgAPI) => async ({
  requestType,
  transactionID,
}: ResendSMSAPIType) => {
  return resendMsgAPI({ requestType, transactionID });
};

export const ResendMessage = ({ moduleType, closeDialog, row }) => {
  const { enqueueSnackbar } = useSnackbar();
  const requestType = row?.data?.requestType;
  const transactionID = row?.data?.tokenID;

  useEffect(() => {
    mutation.mutate({ requestType, transactionID });
  }, [requestType, transactionID]);

  const mutation = useMutation(ReSendSmsAPIWrapper(reSendMessage), {
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
      enqueueSnackbar("SMS has been Re-send", {
        variant: "success",
      });
      closeDialog();
    },
  });

  return null;
};
