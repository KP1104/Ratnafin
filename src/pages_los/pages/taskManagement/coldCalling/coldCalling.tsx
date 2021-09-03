import { useRef, Fragment, useCallback } from "react";
import { ActionTypes } from "components/dataTable";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { serverGridContextGenerator } from "../context";
import {
  ColdCallingDeleteMetaWrapper,
  ColdCallingEditViewMetaWrapper,
  ColdCallingAddMetaWrapper,
} from "./coldCallingCRUD";
import { MoveToInquiryMetaWrapper } from "./moveToInquiry";
import { Routes, Route, useNavigate } from "react-router-dom";

const actions: ActionTypes[] = [
  {
    actionName: "AddColdCalling",
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
        />
      </ServerGridContextProvider>
      <Routes>
        <Route path="/AddColdCalling">
          <ColdCallingAddMetaWrapper
            handleDialogClose={handleDialogClose}
            moduleType="cold-calling"
            isDataChangedRef={isDataEditedRef}
          />
        </Route>
        <Route path="/viewDetails">
          <ColdCallingEditViewMetaWrapper
            handleDialogClose={handleDialogClose}
            moduleType="cold-calling"
            isDataChangedRef={isDataEditedRef}
          />
        </Route>
        <Route path="/delete">
          <ColdCallingDeleteMetaWrapper
            handleDialogClose={handleDialogClose}
            moduleType="cold-calling"
            isDataChangedRef={isDataEditedRef}
          />
        </Route>
        <Route path="/moveToInquiry">
          <MoveToInquiryMetaWrapper
            moduleType="cold-calling"
            isDataChangedRef={isDataEditedRef}
            handleDialogClose={handleDialogClose}
          />
        </Route>
      </Routes>
    </Fragment>
  );
};

export const ColdCollingWrapper = () => {
  return <ColdCalling gridCode="TRN/015" actions={actions} />;
};
