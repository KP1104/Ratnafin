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
import { AssignInquiryWrapper } from "../assignInquiry";
import { PriorityWrapper } from "../priority";
import { MoveToLeadWrapper } from "../moveToLead";
import { EligibilityCalculatorWrapper } from "../eligibilityCalculator";
import { Routes, Route, useNavigate } from "react-router-dom";

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
    navigate("./");
    if (isDataChangedRef.current) {
      myGridRef?.current?.fetchData?.();
      isDataChangedRef.current = false;
    }
  };

  //const dialogClasses = useDialogStyles();
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
          <Route path="/ViewDetails">
            <DetailsTabViewWrapper
              handleDialogClose={handleDialogClose}
              isDataChangedRef={isDataChangedRef}
            />
          </Route>
          <Route path="/ViewDetailsReadOnly">
            <DetailsTabViewWrapper
              handleDialogClose={handleDialogClose}
              isDataChangedRef={isDataChangedRef}
              isReadOnly={true}
            />
          </Route>
          <Route path="/AssignBranch">
            <AssignBranchWrapper
              moduleType="inquiry"
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          </Route>
          <Route path="/AssignInquiry">
            <AssignInquiryWrapper
              moduleType="inquiry"
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          </Route>
          <Route path="/AssignTask">
            <InquiryAssignTaskWrapper
              closeDialog={handleDialogClose}
              isDataChangedRef={isDataChangedRef}
            />
          </Route>
          <Route path="/Priority">
            <PriorityWrapper
              moduleType="inquiry"
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          </Route>
          <Route path="/MoveToLead">
            <MoveToLeadWrapper
              moduleType="inquiry"
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          </Route>
          <Route path="/calculator">
            <EligibilityCalculatorWrapper closeDialog={handleDialogClose} />
          </Route>
        </Routes>
      </ClearCacheProvider>
    </Fragment>
  );
};
