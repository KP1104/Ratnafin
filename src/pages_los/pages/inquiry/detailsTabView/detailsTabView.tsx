import { FC, useEffect, useContext, Suspense, useCallback } from "react";
import { ClearCacheContext, queryClient } from "cache";
import { CRUD } from "./crud";
import Dialog from "@material-ui/core/Dialog";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import { useLocation, useNavigate } from "react-router-dom";

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  productID: string;
  isDataChangedRef: any;
  isReadOnly?: boolean;
}> = ({
  refID,
  moduleType,
  isDataChangedRef,
  isReadOnly = false,
  productID,
}) => {
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
        productID={productID}
      />
    </Suspense>
  );
};

export const DetailsTabViewWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  isReadOnly = false,
  goBackPath = "..",
}) => {
  const { state: rows }: any = useLocation();
  let navigate = useNavigate();
  let handleDialogCloseWrapper = useCallback(() => {
    handleDialogClose();
    navigate(goBackPath);
  }, [navigate]);
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
        isDataChangedRef={isDataChangedRef}
        rejectInquiry={true}
      />
      <DetailsTabView
        moduleType="inquiry"
        refID={rows[0]?.id}
        productID={rows[0]?.data?.product_type}
        isDataChangedRef={isDataChangedRef}
        isReadOnly={isReadOnly}
      />
    </Dialog>
  );
};
