import { Fragment, useEffect, useContext, useRef, useCallback } from "react";
import { Alert } from "components/common/alert";
import { useQuery } from "react-query";
import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { AddPartner, ViewEditPartnerDetailsWrapper } from "./partnerCRUD";
import { ActionTypes } from "components/dataTable";
import { GridMetaDataType } from "components/dataTable/types";
import GridWrapper from "components/dataTableStatic";
import { DocumentGridCRUD } from "./docUpload";
import { partnerGridMetaData } from "./partnerCRUD/metadata";
import * as API from "./partnerCRUD/api";
import { Routes, Route, useNavigate } from "react-router-dom";

const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add Partner",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "edit",
    actionLabel: "Edit",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "documents",
    actionLabel: "Document Details",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const Partner = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const removeCache = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const result = useQuery<any, any>(["getPartnerGridData"], () =>
    API.getPartnerGridData()
  );

  const handleDialogClose = () => {
    navigate("..");
    if (isDataChangedRef.current === true) {
      myGridRef.current?.refetch?.();
      isDataChangedRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries(["getPartnerGridData"]);
    };
  }, [removeCache]);

  return (
    <Fragment>
      {result.isError && (
        <Alert
          severity="error"
          errorMsg={result.error?.error_msg}
          errorDetail={result.error?.error_details}
        />
      )}

      <GridWrapper
        key={`partnerGrid`}
        finalMetaData={partnerGridMetaData as GridMetaDataType}
        data={result.data ?? []}
        setData={() => null}
        loading={result.isLoading || result.isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => result.refetch()}
        ref={myGridRef}
      />
      <Routes>
        <Route
          path="add"
          element={
            <AddPartner
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="edit"
          element={
            <ViewEditPartnerDetailsWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="documents"
          element={<DocumentGridCRUD closeDialog={handleDialogClose} />}
        />
      </Routes>
    </Fragment>
  );
};

export const PartnerWrapper = () => {
  return (
    <ClearCacheProvider>
      <Partner />
    </ClearCacheProvider>
  );
};
