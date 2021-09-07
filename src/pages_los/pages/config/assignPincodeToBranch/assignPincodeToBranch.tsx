import { Fragment, useState, useRef } from "react";
import { ClearCacheProvider } from "cache";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { GridMetaDataType } from "components/dataTable/types";
import GridWrapper from "components/dataTableStatic";
import { InvalidAction } from "pages_los/common/invalidAction";
import { assignPincodeGridMetaData } from "./metadata";
import { AddPincodeToAssignBranch } from "./addPincode";

const actions: ActionTypes[] = [
  {
    actionName: "AddPincode",
    actionLabel: "Add Pincode",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const AssignPincodeToBranch = () => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      myGridRef.current?.refetch?.();
      isDataChangedRef.current = false;
    }
  };

  return (
    <Fragment>
      <GridWrapper
        key={`externalAPIGridStatusListing`}
        finalMetaData={assignPincodeGridMetaData as GridMetaDataType}
        data={[]}
        setData={() => null}
        loading={false}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => {}}
        ref={myGridRef}
      />
      <ClearCacheProvider>
        <Dialog open={Boolean(currentAction)} maxWidth="md">
          <AssignPincodeActions
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
}) => {
  return (currentAction?.name ?? "") === "AddPincode" ? (
    <AddPincodeToAssignBranch closeDialog={handleDialogClose} />
  ) : (
    <InvalidAction closeDialog={handleDialogClose} />
  );
};
