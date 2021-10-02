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

export const Inquiry = ({ gridCode, actions }) => {
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
            path="viewDetails"
            element={
              <DetailsTabViewWrapper
                handleDialogClose={handleDialogClose}
                isDataChangedRef={isDataChangedRef}
              />
            }
          />
          <Route
            path="viewDetailsReadOnly"
            element={
              <DetailsTabViewWrapper
                handleDialogClose={handleDialogClose}
                isDataChangedRef={isDataChangedRef}
                isReadOnly={true}
              />
            }
          />
          <Route
            path="assignBranch"
            element={
              <AssignBranchWrapper
                moduleType="inquiry"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            }
          />
          <Route
            path="assignInquiry"
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
            path="assignTask"
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
            path="moveToLead"
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
            path="documentUpload"
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
