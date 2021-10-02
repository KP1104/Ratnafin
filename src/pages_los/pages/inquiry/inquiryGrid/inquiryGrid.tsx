import { useRef, Fragment, useCallback } from "react";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider } from "cache";
import { serverGridContextGenerator } from "./context";
import { DetailsTabViewWrapper } from "../detailsTabView";
import { InquiryAssignTaskWrapper } from "../inquiryAssignTask";
import { AssignBranchWrapper } from "../assignBranch";
import { InquiryAssignment } from "../inquiryAssignment";
import { PriorityWrapper } from "../priority";
import { MoveToLeadWrapper } from "../moveToLead";
import { EligibilityCalculatorWrapper } from "../eligibilityCalculator";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DocumentUploadWrapper } from "../documentUpload";

export const InquiryGrid = ({ gridCode, actions }) => {
  let navigate = useNavigate();

  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);

  const handleDialogClose = () => {
    if (isDataChangedRef.current) {
      myGridRef?.current?.fetchData?.();
      isDataChangedRef.current = false;
    }
    navigate(".");
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
            path="view-details"
            element={
              <DetailsTabViewWrapper
                handleDialogClose={handleDialogClose}
                isDataChangedRef={isDataChangedRef}
              />
            }
          />
          <Route
            path="view-details-readOnly"
            element={
              <DetailsTabViewWrapper
                handleDialogClose={handleDialogClose}
                isDataChangedRef={isDataChangedRef}
                isReadOnly={true}
              />
            }
          />
          <Route
            path="assign-branch"
            element={
              <AssignBranchWrapper
                moduleType="inquiry"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            }
          />
          <Route
            path="assign-inquiry"
            element={
              <InquiryAssignment
                moduleType="inquiry"
                assignmentType="business"
                isDataChangedRef={isDataChangedRef}
                handleDialogClose={handleDialogClose}
                maxRows={1}
              />
            }
          />
          <Route
            path="assign-task"
            element={
              <InquiryAssignTaskWrapper
                closeDialog={handleDialogClose}
                isDataChangedRef={isDataChangedRef}
              />
            }
          />
          <Route
            path="priority"
            element={
              <PriorityWrapper
                moduleType="inquiry"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            }
          />
          <Route
            path="move-to-lead"
            element={
              <MoveToLeadWrapper
                moduleType="inquiry"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            }
          />
          <Route
            path="calculator"
            element={
              <EligibilityCalculatorWrapper closeDialog={handleDialogClose} />
            }
          />
          <Route
            path="document-upload"
            element={
              <DocumentUploadWrapper
                moduleType="inquiry"
                closeDialog={handleDialogClose}
              />
            }
          />
        </Routes>
      </ClearCacheProvider>
    </Fragment>
  );
};
