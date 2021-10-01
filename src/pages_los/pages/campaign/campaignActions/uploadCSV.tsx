import { lazy, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { Transition } from "pages_los/common";
import { queryClient, ClearCacheContext } from "cache";

const DocumentGridCRUD = lazy(() =>
  import("pages_los/common/documents").then((module) => ({
    default: module.DocumentGridCRUD,
  }))
);

export const DocumentUploadWrapper = ({ isDataChangeRef, closeHandler }) => {
  const removeCache = useContext(ClearCacheContext);
  const { state: rows }: any = useLocation();

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
      fullScreen
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
    >
      <DocumentGridCRUD
        refID={rows[0]?.id}
        moduleType="campaign"
        productType={"csv"}
        serialNo="1"
      />
    </Dialog>
  );
};
