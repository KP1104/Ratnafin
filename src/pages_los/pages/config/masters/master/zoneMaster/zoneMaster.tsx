import { useRef, Fragment, useEffect, useContext, useCallback } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { zoneMasterGridMetaData } from "../../metadata";
import { AddMasterWrapper } from "../addMaster";
import { ViewEditMasterWrapper } from "../editMaster";
import { SubMasterWrapper } from "../../subMaster";
import * as API from "../api";

const actions: ActionTypes[] = [
  {
    actionName: "viewRegions",
    actionLabel: "View Regions",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "edit",
    actionLabel: "Edit Zone",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "add",
    actionLabel: "Add Zone",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];
const ZoneMaster = ({ moduleType }) => {
  let navigate = useNavigate();
  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const removeCache = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);

  const handleDialogClose = () => {
    navigate("./");
    if (isDataChangedRef.current) {
      result?.refetch();
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

  const result = useQuery(["getMastersGridData", moduleType], () =>
    API.getMastersGridData({ moduleType })
  );

  return (
    <Fragment>
      <GridWrapper
        key={moduleType}
        //@ts-ignore
        finalMetaData={zoneMasterGridMetaData}
        data={result?.data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={result?.isLoading || result.isFetching}
      />
      <Routes>
        <Route
          path="add"
          element={
            <AddMasterWrapper
              moduleType={moduleType}
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="edit"
          element={
            <ViewEditMasterWrapper
              moduleType={moduleType}
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="viewRegion"
          element={
            <SubMasterWrapper
              closeDialog={handleDialogClose}
              moduleType="zone-region"
              isDataChangedRef={isDataChangedRef}
              heading="Zone"
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const ZoneMasterWrapper = () => (
  <ClearCacheProvider>
    <ZoneMaster moduleType="zone" />
  </ClearCacheProvider>
);
