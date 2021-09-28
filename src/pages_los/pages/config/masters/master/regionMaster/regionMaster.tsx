import { useRef, Fragment, useEffect, useContext, useState } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { regionMasterGridMetaData } from "../../metadata";
import { AddMasterWrapper } from "../addMaster";
import { ViewEditMasterWrapper } from "../editMaster";
import { SubMasterWrapper } from "../../subMaster";
import * as API from "../api";

const actions: ActionTypes[] = [
  {
    actionName: "viewBranch",
    actionLabel: "View Branches",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "editRegion",
    actionLabel: "Edit Region",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "addRegion",
    actionLabel: "Add Region",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const RegionMaster = ({ moduleType }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const removeCache = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);

  const { refetch, data, isLoading, isFetching, isError, error } = useQuery(
    ["getMastersGridData", moduleType],
    () => API.getMastersGridData({ moduleType })
  );

  //@ts-ignore
  let errorMsg = `${error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${error?.error_detail}`;

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      isDataChangedRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries(["getMastersGridData", moduleType]);
    };
  }, [removeCache]);

  return (
    <Fragment>
      {isError === true ? (
        <Alert
          severity="error"
          errorMsg={errorMsg}
          errorDetail={error_detail ?? ""}
        />
      ) : (
        <>
          <GridWrapper
            key={`staticGrid`}
            finalMetaData={regionMasterGridMetaData as any}
            data={data ?? []}
            setData={() => null}
            actions={actions}
            setAction={setCurrentAction}
            loading={isLoading || isFetching}
            refetchData={refetch}
            ref={myGridRef}
          />
          <RegionMasterActionWrapper
            moduleType={moduleType}
            isDataChangedRef={isDataChangedRef}
            closeDialog={handleDialogClose}
            currentAction={currentAction}
          />
        </>
      )}
    </Fragment>
  );
};

const RegionMasterActionWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  currentAction,
}) => {
  return (currentAction?.name ?? "") === "addRegion" ? (
    <AddMasterWrapper
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      data={currentAction?.rows}
    />
  ) : (currentAction?.name ?? "") === "editRegion" ? (
    <ViewEditMasterWrapper
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      data={currentAction?.rows}
    />
  ) : (currentAction?.name ?? "") === "viewBranch" ? (
    <SubMasterWrapper
      closeDialog={closeDialog}
      moduleType="region-branch"
      isDataChangedRef={isDataChangedRef}
      heading="Region"
      data={currentAction?.rows}
    />
  ) : null;
};

export const RegionMasterWrapper = () => (
  <ClearCacheProvider>
    <RegionMaster moduleType="region" />
  </ClearCacheProvider>
);
