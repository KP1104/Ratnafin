import { useRef, Fragment, useCallback } from "react";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { AssignTaskWrapper, ViewEditTaskWrapper } from "./taskCRUD";
import { HistoryMetaWrapper } from "./history";
import { serverGridContextGenerator } from "../context";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ClearCacheProvider } from "cache";

export const Task = ({ gridCode, actions }) => {
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
            path="addTask"
            element={
              <AssignTaskWrapper
                handleDialogClose={handleDialogClose}
                moduleType="task"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="viewDetails"
            element={
              <ViewEditTaskWrapper
                handleDialogClose={handleDialogClose}
                moduleType="task"
                isDataChangedRef={isDataEditedRef}
              />
            }
          />
          <Route
            path="taskHistory"
            element={
              <HistoryMetaWrapper
                handleDialogClose={handleDialogClose}
                moduleType="task"
              />
            }
          />
        </Routes>
      </ClearCacheProvider>
    </Fragment>
  );
};
