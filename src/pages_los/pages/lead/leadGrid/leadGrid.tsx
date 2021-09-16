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

export const LeadGrid = ({ gridCode, actions }) => {
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
    navigate("./");
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
          <Route path="/detailView">
            <DetailsTabViewWrapper
              moduleType="lead"
              isDataChangedRef={isDataEditedRef}
              handleDialogClose={handleDialogClose}
            />
          </Route>
          <Route path="/cam">
            <CAMWrapper
              moduleType="lead"
              isDataChangedRef={isDataEditedRef}
              handleDialogClose={handleDialogClose}
            />
          </Route>
          <Route path="/analysis">
            <AnalysisWrapper
              moduleType="lead"
              handleDialogClose={handleDialogClose}
            />
          </Route>
          <Route path="/stages">
            <StageWrapper
              moduleType="lead"
              isDataChangedRef={isDataEditedRef}
              handleDialogClose={handleDialogClose}
            />
          </Route>
          <Route path="/leadAssign">
            <LeadAssign
              handleDialogClose={handleDialogClose}
              moduleType="lead"
              isDataChangedRef={isDataEditedRef}
            />
          </Route>
          <Route path="/taskAssign">
            <LeadAssignTaskWrapper
              handleDialogClose={handleDialogClose}
              isDataChangedRef={isDataEditedRef}
            />
          </Route>
          <Route path="/verification">
            <VerificationWrapper
              handleDialogClose={handleDialogClose}
              moduleType="lead"
            />
          </Route>
          <Route path="/bankLogin">
            <BankLoginWrapper
              handleDialogClose={handleDialogClose}
              moduleType="lead"
            />
          </Route>
          <Route path="/viewMandate">
            <MandateMetaWrapper
              handleDialogClose={handleDialogClose}
              moduleType="lead"
              isDataChangedRef={isDataEditedRef}
            />
          </Route>
          <Route path="/sanction">
            <SanctionMetaWrapper
              handleDialogClose={handleDialogClose}
              moduleType="lead"
              isDataChangedRef={isDataEditedRef}
            />
          </Route>
          <Route path="/auditDownload">
            <AuditDownloadWrapper
              handleDialogClose={handleDialogClose}
              moduleType="lead"
            />
          </Route>
        </Routes>
      </ClearCacheProvider>
    </Fragment>
  );
};
