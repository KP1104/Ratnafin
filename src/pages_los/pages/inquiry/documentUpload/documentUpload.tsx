import { lazy } from "react";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { Transition } from "pages_los/common";
import { HeaderDetails } from "../headerDetails";

const DocumentGridCRUD = lazy(() =>
  import("pages_los/common/documents").then((module) => ({
    default: module.DocumentGridCRUD,
  }))
);

export const DocumentUploadWrapper = ({ moduleType, closeDialog }) => {
  const { state: rows }: any = useLocation();
  return (
    <Dialog
      fullScreen
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      onClose={closeDialog}
    >
      <HeaderDetails productData={rows?.[0]} handleDialogClose={closeDialog} />
      <DocumentGridCRUD
        refID={rows[0]?.id}
        moduleType={moduleType}
        productType=""
        serialNo="1"
      />
    </Dialog>
  );
};
