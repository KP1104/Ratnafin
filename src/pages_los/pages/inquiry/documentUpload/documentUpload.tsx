import { lazy, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router";
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

export const DocumentUploadWrapper = ({
  moduleType,
  closeDialog,
  goBackPath = "..",
}) => {
  const removeCache = useContext(ClearCacheContext);
  const navigate = useNavigate();
  let handleDialogCloseWrapper = useCallback(() => {
    closeDialog();
    navigate(goBackPath);
  }, [navigate]);
  const { state: rows }: any = useLocation();
  const productCode = rows[0]?.data?.product_type;

  let skipGSTForRetail: Boolean = false;

  skipGSTForRetail =
    ["12300001", "12300002", "12300003", "12300004"].indexOf(productCode) > -1
      ? true
      : false;

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
      <HeaderDetails
        productData={rows[0]?.data}
        handleDialogClose={handleDialogCloseWrapper}
      />
      <DocumentGridCRUD
        refID={rows[0]?.id}
        moduleType={moduleType}
        productType={Boolean(skipGSTForRetail) ? "management" : ""}
        serialNo="1"
        skipBankDetails={true}
      />
    </Dialog>
  );
};
