import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { expireLink } from "../api";

interface ExpireLinkType {
  requestType: any;
  transactionID: any;
}

const ExpireLinkWrapper = (expireLink) => async ({
  requestType,
  transactionID,
}: ExpireLinkType) => {
  return expireLink({ requestType, transactionID });
};

export const ExpireLink = ({
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

  const mutation = useMutation(ExpireLinkWrapper(expireLink), {
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
      enqueueSnackbar("Link has been expired", {
        variant: "success",
      });
      closeDialog();
    },
  });

  return null;
};
