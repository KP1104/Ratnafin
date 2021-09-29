import { useRef, Fragment, useCallback } from "react";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider } from "cache";
import { serverGridContextGenerator } from "./context";
import { LeadAssignTaskWrapper } from "../leadAssignTask";
import { DetailsTabViewWrapper } from "../detailsTabView";
import { AnalysisWrapper } from "../analysis";
import { StageWrapper } from "../stages";
import { CAMWrapper } from "../cam";
import { LeadAssign } from "../leadAssign";
import { VerificationWrapper } from "../verification";
import { BankLoginWrapper } from "../bankLogin";
import { MandateMetaWrapper } from "../mandate";
import { SanctionMetaWrapper } from "../sanction";
import { AuditDownloadWrapper } from "../bankLogin/auditDownload";
import { Routes, Route, useNavigate } from "react-router-dom";

export const LeadGrid = ({ gridCode, actions, basePath }) => {
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
    navigate(basePath);
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
          defaultSortOrder={[{ id: "tran_cd", desc: true }]}
        />
      </ServerGridContextProvider>
      <ClearCacheProvider>
        <Routes>
          <Route
            path="detailView"
            element={
              <DetailsTabViewWrapper
                moduleType="lead"
                isDataChangedRef={isDataEditedRef}
                handleDialogClose={handleDialogClose}
              />
            }
          />
          <Route
            path="cam"
            element={
              <CAMWrapper
                moduleType="lead"
                isDataChangedRef={isDataEditedRef}
                handleDialogClose={handleDialogClose}
              />
            }
          />
          <Route
            path="analysis"
            element={
              <AnalysisWrapper
                moduleType="lead"
                handleDialogClose={handleDialogClose}
              />
            }
          />
          <Route
            path="stages"
            element={
              <StageWrapper
                moduleType="lead"
                isDataChangedRef={isDataEditedRef}
                handleDialogClose={handleDialogClose}
              />
            }
          />
          <Route
            path="leadAssign"
            element={
              <LeadAssign
                handleDialogClose={handleDialogClose}
                moduleType="lead"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="taskAssign"
            element={
              <LeadAssignTaskWrapper
                handleDialogClose={handleDialogClose}
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="verification"
            element={
              <VerificationWrapper
                handleDialogClose={handleDialogClose}
                moduleType="lead"
              />
            }
          />
          <Route
            path="bankLogin"
            element={
              <BankLoginWrapper
                handleDialogClose={handleDialogClose}
                moduleType="lead"
              />
            }
          />
          <Route
            path="viewMandate"
            element={
              <MandateMetaWrapper
                handleDialogClose={handleDialogClose}
                moduleType="lead"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="sanction"
            element={
              <SanctionMetaWrapper
                handleDialogClose={handleDialogClose}
                moduleType="lead"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="auditDownload"
            element={
              <AuditDownloadWrapper
                handleDialogClose={handleDialogClose}
                moduleType="lead"
              />
            }
          />
        </Routes>
      </ClearCacheProvider>
    </Fragment>
  );
};
