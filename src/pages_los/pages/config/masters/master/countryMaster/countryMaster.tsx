import { useRef, Fragment, useEffect, useContext, useState } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { countryMasterGridMetaData } from "../../metadata/grid";
import { AddMasterWrapper } from "../addMaster";
import { ViewEditMasterWrapper } from "../editMaster";
import { SubMasterWrapper } from "../../subMaster";
import * as API from "../api";

const actions: ActionTypes[] = [
  {
    actionName: "viewZone",
    actionLabel: "View Zones",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "editCountry",
    actionLabel: "Edit Country",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "addCountry",
    actionLabel: "Add Country",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const CountryMaster = ({ moduleType }) => {
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
            //@ts-ignore
            finalMetaData={countryMasterGridMetaData}
            data={data ?? []}
            setData={() => null}
            actions={actions}
            setAction={setCurrentAction}
            loading={isLoading || isFetching}
            refetchData={refetch}
            ref={myGridRef}
          />
          <CountryMasterActionWrapper
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

const CountryMasterActionWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  currentAction,
}) => {
  return (currentAction?.name ?? "") === "addCountry" ? (
    <AddMasterWrapper
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      data={currentAction?.rows}
    />
  ) : (currentAction?.name ?? "") === "editCountry" ? (
    <ViewEditMasterWrapper
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      data={currentAction?.rows}
    />
  ) : (currentAction?.name ?? "") === "viewZone" ? (
    <SubMasterWrapper
      closeDialog={closeDialog}
      moduleType="country-zone"
      isDataChangedRef={isDataChangedRef}
      heading="Country"
      data={currentAction?.rows}
    />
  ) : null;
};

export const CountryMasterWrapper = () => (
  <ClearCacheProvider>
    <CountryMaster moduleType="country" />
  </ClearCacheProvider>
);
