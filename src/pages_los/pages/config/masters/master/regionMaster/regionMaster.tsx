import { useRef, Fragment, useEffect, useContext, useCallback } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
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
      queryClient.removeQueries(["getMastersGridData", "region"]);
    };
  }, [removeCache]);

  const result = useQuery(["getMastersGridData", moduleType], () =>
    API.getMastersGridData({ moduleType })
  );

  return (
    <Fragment>
      <GridWrapper
        key={`staticGrid`}
        //@ts-ignore
        finalMetaData={regionMasterGridMetaData}
        data={result?.data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={result?.isLoading || result.isFetching}
      />
      <Routes>
        <Route
          path="/addRegion"
          element={
            <AddMasterWrapper
              moduleType={moduleType}
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="/editRegion"
          element={
            <ViewEditMasterWrapper
              moduleType={moduleType}
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="/viewBranch"
          element={
            <SubMasterWrapper
              closeDialog={handleDialogClose}
              moduleType="region-branch"
              isDataChangedRef={isDataChangedRef}
              heading="Region"
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const RegionMasterWrapper = () => (
  <ClearCacheProvider>
    <RegionMaster moduleType="region" />
  </ClearCacheProvider>
);
