import { FC, useEffect, useContext, Suspense } from "react";
import { ClearCacheContext, queryClient } from "cache";
import { CRUD } from "./crud";
import Dialog from "@material-ui/core/Dialog";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import { useLocation } from "react-router-dom";

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  isDataChangedRef: any;
  isReadOnly?: boolean;
}> = ({ refID, moduleType, isDataChangedRef, isReadOnly = false }) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <Suspense fallback={"loading..."}>
      <CRUD
        moduleType={moduleType}
        productType="main"
        refID={refID}
        dataAlwaysExists={true}
        isDataChangedRef={isDataChangedRef}
        readOnly={isReadOnly}
      />
    </Suspense>
  );
};

export const DetailsTabViewWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  isReadOnly = false,
}) => {
  const { state: rows }: any = useLocation();
  return (
    <Dialog
      fullScreen
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      onClose={handleDialogClose}
    >
      <HeaderDetails
        productData={rows[0]?.data}
        handleDialogClose={handleDialogClose}
        isDataChangedRef={isDataChangedRef}
        rejectInquiry={true}
      />
      <DetailsTabView
        moduleType="inquiry"
        refID={rows[0]?.id}
        isDataChangedRef={isDataChangedRef}
        isReadOnly={isReadOnly}
      />
    </Dialog>
  );
};
