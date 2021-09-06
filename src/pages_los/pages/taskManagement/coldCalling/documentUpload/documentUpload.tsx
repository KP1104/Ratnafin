import { lazy, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { Transition } from "pages_los/common";
import { HeaderDetails } from "../headerDetails";
import { queryClient, ClearCacheContext } from "cache";

const DocumentGridCRUD = lazy(() =>
  import("pages_los/common/documents").then((module) => ({
    default: module.DocumentGridCRUD,
  }))
);

export const DocumentUploadWrapper = ({ moduleType, closeDialog }) => {
  const removeCache = useContext(ClearCacheContext);
  const { state: rows }: any = useLocation();
  const productCode = rows[0]?.data?.product_type;
  let skipGSTForRetail: Boolean = false;

  skipGSTForRetail = ["12000001"].indexOf(productCode) > -1 ? true : false;

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
      onClose={closeDialog}
    >
      <HeaderDetails rowData={rows[0]?.data} handleDialogClose={closeDialog} />
      <DocumentGridCRUD
        refID={rows[0]?.id}
        moduleType="cold-inquiry"
        productType={Boolean(skipGSTForRetail) ? "management" : ""}
        serialNo="1"
        skipBankDetails={true}
      />
    </Dialog>
  );
};
