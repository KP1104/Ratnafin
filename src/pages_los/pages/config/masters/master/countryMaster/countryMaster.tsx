import { useRef, Fragment, useEffect, useContext, useCallback } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { useQuery } from "react-query";
import { Routes, Route, useNavigate } from "react-router-dom";
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
        key={`staticGrid`}
        //@ts-ignore
        finalMetaData={countryMasterGridMetaData}
        data={result?.data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={result?.isLoading || result.isFetching}
      />
      <Routes>
        <Route
          path="/addCountry"
          element={
            <AddMasterWrapper
              moduleType={moduleType}
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="/editCountry"
          element={
            <ViewEditMasterWrapper
              moduleType={moduleType}
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="/viewZone"
          element={
            <SubMasterWrapper
              closeDialog={handleDialogClose}
              moduleType="country-zone"
              isDataChangedRef={isDataChangedRef}
              heading="Country"
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const CountryMasterWrapper = () => (
  <ClearCacheProvider>
    <CountryMaster moduleType="country" />
  </ClearCacheProvider>
);
