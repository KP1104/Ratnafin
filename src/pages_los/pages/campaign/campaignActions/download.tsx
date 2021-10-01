import { useEffect } from "react";
import { useQuery } from "react-query";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { createNewWorkbook } from "components/report/export";
import { downloadFile } from "pages_los/common/download";
import * as API from "../api";

export const DownloadFailedRecords = ({ details, closeDialog }) => {
  const refID = details[0]?.data?.refID;
  const serialNo = details[0]?.id;

  const { data, isLoading, isFetching } = useQuery<any, any>(
    ["getFailedRecords", refID, serialNo],
    () => API.downloadFailedCampaign(refID, serialNo)
  );

  useEffect(() => {
    if (isLoading === false || isFetching === false) {
      createNewWorkbook({ title: "Failed Records", data: data });
      closeDialog();
    }
  }, [isLoading, isFetching, data]);

  return isLoading || isFetching ? (
    <Dialog open={true}>
      <DialogContent>Downloading...</DialogContent>
    </Dialog>
  ) : null;
};

export const DownloadAllRecords = ({ details, closeDialog }) => {
  const refID = details[0]?.data?.refID;
  const serialNo = details[0]?.id;

  useEffect(() => {
    let url = API.downloadAllCampaign(refID, serialNo);
    downloadFile(url, "All records");
    closeDialog();
  }, [closeDialog, refID, serialNo]);

  return null;
};
