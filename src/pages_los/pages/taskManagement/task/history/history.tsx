import { Fragment, FC, useEffect, useContext } from "react";
import { queryClient, ClearCacheContext } from "cache";
import { useQuery } from "react-query";
import { GridMetaDataType } from "components/dataTable/types";
import Dialog from "@material-ui/core/Dialog";
import GridWrapper from "components/dataTableStatic";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { Transition } from "pages_los/common/transition";
import * as API from "./api";
import { Alert } from "components/common/alert";
import { useLocation } from "react-router-dom";
import { historyGridMetaData } from "./metaData";
import { HeaderDetails } from "../headerDetails";

const HistoryGrid: FC<{
  moduleType: any;
  taskID: string;
}> = ({ moduleType, taskID }) => {
  const result = useQuery<any, any>(
    ["getTaskHistoryGridData", moduleType, taskID],
    () => API.getTaskHistoryGridData({ moduleType, taskID })
  );
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getTaskHistoryGridData", moduleType, taskID]);
    };
  }, []);

  const renderResult = (
    <Fragment>
      {result.isError ? (
        <Alert
          severity="error"
          errorMsg={result?.error?.error_msg}
          errorDetail={result?.error?.error_dtl ?? ""}
        />
      ) : null}
      <GridWrapper
        key={`externalAPIGridStatusListing`}
        finalMetaData={historyGridMetaData as GridMetaDataType}
        data={result.data ?? []}
        setData={() => null}
        loading={result.isLoading || result.isFetching}
      />
    </Fragment>
  );

  return renderResult;
};

export const HistoryMetaWrapper = ({ handleDialogClose, moduleType }) => {
  const classes = useDialogStyles();
  const { state: rows }: any = useLocation();
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, []);
  return (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      PaperProps={{
        style: {
          width: "100%",
          minHeight: "20vh",
        },
      }}
      maxWidth="md"
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <HeaderDetails
        rowData={rows?.[0].data}
        handleDialogClose={handleDialogClose}
      />

      <HistoryGrid moduleType={moduleType} taskID={rows[0].id} />
    </Dialog>
  );
};
