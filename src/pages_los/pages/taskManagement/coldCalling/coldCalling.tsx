import { useRef, Fragment, useCallback } from "react";
import { ActionTypes } from "components/dataTable";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { serverGridContextGenerator } from "../context";
import {
  ColdCallingDeleteWrapper,
  ColdCallingEditViewWrapper,
  ColdCallingAddWrapper,
} from "./coldCallingCRUD";
import { MoveToInquiryWrapper } from "./moveToInquiry";
import { DocumentUploadWrapper } from "./documentUpload";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ClearCacheProvider } from "cache";

const actions: ActionTypes[] = [
  {
    actionName: "addColdCalling",
    actionLabel: "Add New",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "moveToInquiry",
    actionLabel: "Move to Inquiry",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "viewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "documentUpload",
    actionLabel: "Document Upload",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const ColdCalling = ({ gridCode, actions }) => {
  let navigate = useNavigate();
  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const isDataEditedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const handleDialogClose = () => {
    navigate("..");
    if (isDataEditedRef.current) {
      myGridRef?.current?.fetchData?.();
      isDataEditedRef.current = false;
    }
  };

  return (
    <Fragment>
      <ServerGridContextProvider {...serverGridContextGenerator(gridCode)}>
        <ServerGrid
          gridCode={gridCode}
          actions={actions}
          setAction={setCurrentAction}
          ref={myGridRef}
        />
      </ServerGridContextProvider>
      <ClearCacheProvider>
        <Routes>
          <Route
            path="addColdCalling"
            element={
              <ColdCallingAddWrapper
                handleDialogClose={handleDialogClose}
                moduleType="cold-calling"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="viewDetails"
            element={
              <ColdCallingEditViewWrapper
                handleDialogClose={handleDialogClose}
                moduleType="cold-calling"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="delete"
            element={
              <ColdCallingDeleteWrapper
                handleDialogClose={handleDialogClose}
                moduleType="cold-calling"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="moveToInquiry"
            element={
              <MoveToInquiryWrapper
                moduleType="cold-calling"
                isDataChangedRef={isDataEditedRef}
                handleDialogClose={handleDialogClose}
              />
            }
          />
          <Route
            path="documentUpload"
            element={
              <DocumentUploadWrapper
                moduleType="cold-calling"
                closeDialog={handleDialogClose}
              />
            }
          />
        </Routes>
      </ClearCacheProvider>
    </Fragment>
  );
};

export const ColdCollingWrapper = () => {
  return <ColdCalling gridCode="TRN/015" actions={actions} />;
};
