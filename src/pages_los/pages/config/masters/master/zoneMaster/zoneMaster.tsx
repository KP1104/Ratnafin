import { useRef, Fragment, useEffect, useContext, useState } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { zoneMasterGridMetaData } from "../../metadata";
import { AddMasterWrapper } from "../addMaster";
import { ViewEditMasterWrapper } from "../editMaster";
import { SubMasterWrapper } from "../../subMaster";
import * as API from "../api";

const actions: ActionTypes[] = [
  {
    actionName: "viewRegion",
    actionLabel: "View Regions",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "editZone",
    actionLabel: "Edit Zone",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "addZone",
    actionLabel: "Add Zone",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

const ZoneMaster = ({ moduleType }) => {
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
            key={moduleType}
            //@ts-ignore
            finalMetaData={zoneMasterGridMetaData}
            data={data ?? []}
            setData={() => null}
            actions={actions}
            setAction={setCurrentAction}
            loading={isLoading || isFetching}
            refetchData={refetch}
            ref={myGridRef}
          />
          <ZoneMasterActionWrapper
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

const ZoneMasterActionWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  currentAction,
}) => {
  return (currentAction?.name ?? "") === "addZone" ? (
    <AddMasterWrapper
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      data={currentAction?.rows}
    />
  ) : (currentAction?.name ?? "") === "editZone" ? (
    <ViewEditMasterWrapper
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      data={currentAction?.rows}
    />
  ) : (currentAction?.name ?? "") === "viewRegion" ? (
    <SubMasterWrapper
      closeDialog={closeDialog}
      moduleType="zone-region"
      isDataChangedRef={isDataChangedRef}
      heading="Zone"
      data={currentAction?.rows}
    />
  ) : null;
};

export const ZoneMasterWrapper = () => (
  <ClearCacheProvider>
    <ZoneMaster moduleType="zone" />
  </ClearCacheProvider>
);
