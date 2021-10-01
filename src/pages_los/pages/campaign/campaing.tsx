import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { ClearCacheContext, queryClient } from "cache";
import { useQuery } from "react-query";
import { Routes, Route, useNavigate } from "react-router";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import {
  AddCampaignWrapper,
  ViewEditCampaignWrapper,
  CampaignDetails,
  CampaignDeleteWrapper,
} from "./campaignActions";
import { campaignGridMetaData } from "./metadata";
import { UploadCSV } from "./uploadCSV";
import * as API from "./api";

const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add Campaign",
    alwaysAvailable: true,
    multiple: undefined,
  },
  {
    actionName: "details",
    actionLabel: "Details",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "edit",
    actionLabel: "Edit",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Inactive",
    multiple: true,
  },
  {
    actionName: "uploadDocument",
    actionLabel: "Upload CSV",
    multiple: false,
  },
];

export const Campaign = () => {
  const navigate = useNavigate();
  const removeCache = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);

  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, { state: data?.rows });
    },
    [navigate]
  );

  const handleDialogClose = () => {
    navigate("..");
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  };
  const { refetch, data, isLoading, isFetching } = useQuery(
    ["getCampaignGridData"],
    () => API.getCampaignGridData()
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getCampaignGridData"]);
    };
  }, []);

  return (
    <Fragment>
      <GridWrapper
        key="capmaignGrid"
        finalMetaData={campaignGridMetaData as any}
        data={data ?? []}
        setData={() => {}}
        actions={actions}
        setAction={setCurrentAction}
        defaultSortOrder={[{ id: "refID", desc: "false" }]}
        loading={isLoading || isFetching}
        refetchData={refetch}
      />
      <Routes>
        <Route
          path="add"
          element={
            <AddCampaignWrapper
              isDataChangeRef={isDataChangedRef}
              closeHandler={handleDialogClose}
            />
          }
        />
        <Route
          path="edit"
          element={
            <ViewEditCampaignWrapper
              isDataChangeRef={isDataChangedRef}
              closeHandler={handleDialogClose}
            />
          }
        />
        <Route
          path="delete"
          element={
            <CampaignDeleteWrapper
              isDataChangeRef={isDataChangedRef}
              closeHandler={handleDialogClose}
            />
          }
        />
        <Route
          path="details"
          element={<CampaignDetails closeHandler={handleDialogClose} />}
        />

        <Route
          path="uploadDocument"
          element={
            <UploadCSV
              onClose={handleDialogClose}
              isDataChangeRef={isDataChangedRef}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};
