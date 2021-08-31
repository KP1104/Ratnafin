import { reSendMessage } from "../api";
import { useQuery } from "react-query";
import Alert from "@material-ui/lab/Alert";

export const ResendMessage = ({ closeDialog, row, moduleType }) => {
  const requestType = row?.data?.requestType;
  const transactionID = row?.data?.tokenID;

  const result1: any = useQuery(
    ["resendMessage", requestType, transactionID],
    () => reSendMessage(requestType, transactionID)
  );

  let errorMsg =
    typeof result1.error === "object"
      ? result1?.error?.error_msg
      : "cannot read error,unknown error";

  return (
    <Alert severity="error" onClose={closeDialog}>
      {errorMsg}
    </Alert>
  );
};
