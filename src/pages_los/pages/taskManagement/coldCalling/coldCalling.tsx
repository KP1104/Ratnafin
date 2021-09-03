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
import { Routes, Route, useNavigate } from "react-router-dom";
import { ClearCacheProvider } from "cache";

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
      <ClearCacheProvider>
        <Routes>
          <Route path="/AddColdCalling">
            <ColdCallingAddWrapper
              handleDialogClose={handleDialogClose}
              moduleType="cold-calling"
              isDataChangedRef={isDataEditedRef}
            />
          </Route>
          <Route path="/viewDetails">
            <ColdCallingEditViewWrapper
              handleDialogClose={handleDialogClose}
              moduleType="cold-calling"
              isDataChangedRef={isDataEditedRef}
            />
          </Route>
          <Route path="/delete">
            <ColdCallingDeleteWrapper
              handleDialogClose={handleDialogClose}
              moduleType="cold-calling"
              isDataChangedRef={isDataEditedRef}
            />
          </Route>
          <Route path="/moveToInquiry">
            <MoveToInquiryWrapper
              moduleType="cold-calling"
              isDataChangedRef={isDataEditedRef}
              handleDialogClose={handleDialogClose}
            />
          </Route>
        </Routes>
      </ClearCacheProvider>
    </Fragment>
  );
};

export const ColdCollingWrapper = () => {
  return <ColdCalling gridCode="TRN/015" actions={actions} />;
};
