import { useEffect } from "react";

import { downloadFile } from "pages_los/common/download";
import { generateDocumentDownloadURL } from "../api";

export const Download = ({ closeDialog, row, moduleType }) => {
  const transactionID = row?.data?.tokenID;
  useEffect(() => {
    let url = generateDocumentDownloadURL(moduleType, transactionID);
    downloadFile(url, transactionID);
    closeDialog();
  }, [closeDialog, moduleType, transactionID]);
  return null;
};
