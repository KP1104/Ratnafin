import { useEffect, Fragment, useState, useRef } from "react";
import { queryClient } from "cache";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import Dialog from "@material-ui/core/Dialog";
import GridWrapper from "components/dataTableStatic";
import { ActionTypes } from "components/dataTable";
import { campaignDetailsGridMetaData } from "../metadata";
import { DownloadAllRecords, DownloadFailedRecords } from "./download";
import { Header } from "../header";
import * as API from "../api";

const actions: ActionTypes[] = [
  {
    actionName: "failedDownload",
    actionLabel: "Failed Download",
    multiple: false,
    rowDoubleClick: false,
    shouldExclude: (rows) => {
      let exclude = true;
      if (rows[0].data?.failedRecords > 0) {
        exclude = false;
      }
      return exclude;
    },
  },
  {
    actionName: "download",
    actionLabel: "Download",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const CampaignDetails = ({ closeHandler }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      isDataChangedRef.current = false;
    }
  };

  const { state: rows }: any = useLocation();
  const refID = rows[0]?.id;
  const { refetch, data, isLoading, isFetching } = useQuery(
    ["getCampaignDetails", refID],
    () => API.getCampaignDetails(refID)
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getCampaignDetails"]);
    };
  }, []);

  return (
    <Fragment>
      <Dialog open={true} fullScreen>
        <Header details={rows[0]?.data} closeDialog={closeHandler} />
        <GridWrapper
          key="capmaignDetailsGrid"
          finalMetaData={campaignDetailsGridMetaData as any}
          data={data ?? []}
          setData={() => {}}
          actions={actions}
          setAction={setCurrentAction}
          defaultSortOrder={[{ id: "serialNo", desc: false }]}
          loading={isLoading || isFetching}
          refetchData={refetch}
        />
        {(currentAction?.name ?? "") === "failedDownload" ? (
          <DownloadFailedRecords
            details={currentAction?.rows}
            closeDialog={handleDialogClose}
          />
        ) : (currentAction?.name ?? "") === "download" ? (
          <DownloadAllRecords
            details={currentAction?.rows}
            closeDialog={handleDialogClose}
          />
        ) : null}
      </Dialog>
    </Fragment>
  );
};
