import { useState, useRef, Fragment, useContext, useEffect } from "react";
import { ActionTypes } from "components/dataTable";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { serverGridContextGenerator } from "../context";
import {
  WorklogAddWrapper,
  WorklogViewEditWrapper,
  WorklogDeleteWrapper,
} from "./worklogCRUD";
import dateFormat from "date-fns/format";

const actions: ActionTypes[] = [
  {
    actionName: "ViewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "AddWorklog",
    actionLabel: "Add New",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const Worklog = ({ gridCode, actions }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      myGridRef?.current?.fetchData?.();
      isDataChangedRef.current = false;
    }
  };
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <Fragment>
      <ServerGridContextProvider {...serverGridContextGenerator(gridCode)}>
        <ServerGrid
          gridCode={gridCode}
          actions={actions}
          setAction={setCurrentAction}
          ref={myGridRef}
          defaultSortOrder={[{ id: "tran_date", desc: true }]}
          defaultFilter={[
            {
              id: "tran_date",
              value: {
                type: "date",
                value: dateFormat(new Date(), "iii LLL dd yyyy HH:mm:ss xxxx"),
                condition: "equal",
                columnName: "Tran Date",
              },
            },
          ]}
        />
      </ServerGridContextProvider>
      <WorkLogActionSelector
        refetchData={myGridRef?.current?.fetchData}
        currentAction={currentAction}
        isDataChangedRef={isDataChangedRef}
        handleDialogClose={handleDialogClose}
      />
    </Fragment>
  );
};

const WorkLogActionSelector = ({
  currentAction,
  isDataChangedRef,
  handleDialogClose,
  refetchData,
}) => {
  return (currentAction?.name ?? "") === "AddWorklog" ? (
    <WorklogAddWrapper
      handleDialogClose={handleDialogClose}
      refetchData={refetchData}
    />
  ) : (currentAction?.name ?? "") === "ViewDetails" ? (
    <WorklogViewEditWrapper
      currentAction={currentAction}
      isDataChangedRef={isDataChangedRef}
      handleDialogClose={handleDialogClose}
    />
  ) : (currentAction?.name ?? "") === "Delete" ? (
    <WorklogDeleteWrapper
      currentAction={currentAction}
      handleDialogClose={handleDialogClose}
      isDataChangedRef={isDataChangedRef}
    />
  ) : null;
};

export const WorklogWrapper = () => {
  return (
    <ClearCacheProvider>
      <Worklog gridCode="TRN/014" actions={actions} />;
    </ClearCacheProvider>
  );
};
