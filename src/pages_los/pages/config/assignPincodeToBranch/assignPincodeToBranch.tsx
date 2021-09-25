import { Fragment, useState, useRef, useEffect } from "react";
import { ClearCacheProvider, queryClient } from "cache";
import Dialog from "@material-ui/core/Dialog";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";
import { GridMetaDataType } from "components/dataTable/types";
import GridWrapper from "components/dataTableStatic";
import { InvalidAction } from "pages_los/common/invalidAction";
import { Alert } from "components/common/alert";
import { assignPincodeGridMetaData } from "./metadata";
import {
  AddPincodeToAssignBranch,
  PincodeDeleteWrapper,
} from "./pincodeAddDlt";
import * as API from "./api";

const actions: ActionTypes[] = [
  {
    actionName: "AddPincode",
    actionLabel: "Add Pincode",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
];

export const AssignPincodeToBranch = () => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      myGridRef?.current?.fetchData?.();
      isDataChangedRef.current = false;
    }
  };

  const result = useQuery<any, any>(["getPincodeAssignBranchGridData"], () =>
    API.getPincodeList()
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getPincodeAssignBranchGridData"]);
    };
  }, []);

  console.log(typeof myGridRef);
  return (
    <Fragment>
      {result.isError && (
        <Alert
          severity="error"
          errorMsg={result?.error?.error_msg}
          errorDetail={result?.error?.error_details}
        />
      )}
      <GridWrapper
        key={`externalAPIGridStatusListing`}
        finalMetaData={assignPincodeGridMetaData as GridMetaDataType}
        data={result.data ?? []}
        setData={() => null}
        loading={result.isLoading || result.isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => result?.refetch()}
        ref={myGridRef}
      />
      <ClearCacheProvider>
        <Dialog open={Boolean(currentAction)} maxWidth="md">
          <AssignPincodeActions
            refetchData={myGridRef?.current?.fetchData?.()}
            currentAction={currentAction}
            handleDialogClose={handleDialogClose}
            isDataChangedRef={isDataChangedRef}
          />
        </Dialog>
      </ClearCacheProvider>
    </Fragment>
  );
};

const AssignPincodeActions = ({
  currentAction,
  handleDialogClose,
  isDataChangedRef,
  refetchData,
}) => {
  return (currentAction?.name ?? "") === "AddPincode" ? (
    <AddPincodeToAssignBranch
      closeDialog={handleDialogClose}
      refetchData={refetchData}
      isDataChangedRef={isDataChangedRef}
    />
  ) : (currentAction?.name ?? "") === "delete" ? (
    <PincodeDeleteWrapper
      closeDialog={handleDialogClose}
      currentAction={currentAction}
      isDataChangedRef={isDataChangedRef}
    />
  ) : (
    <InvalidAction closeDialog={handleDialogClose} />
  );
};
