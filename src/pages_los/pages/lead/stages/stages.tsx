import { useEffect, useRef, useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { ClearCacheContext, queryClient } from "cache";
import { StagesGrid } from "./grid";
import { StagesAPIProvider, generateStagesAPIContext } from "./context";
import { UpdatePriority } from "./updateStage";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { useLocation } from "react-router-dom";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";

const actions: ActionTypes[] = [
  {
    actionName: "stages",
    actionLabel: "Change Lead Stage",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const Stage = ({ refID, moduleType, isDataChangedRef }) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const removeCache = useContext(ClearCacheContext);
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      gridRef.current?.refetch?.();
      isMyDataChangedRef.current = false;
    }
  };
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);
  const classes = useDialogStyles();

  return (
    <StagesAPIProvider {...generateStagesAPIContext({ refID, moduleType })}>
      <StagesGrid
        ref={gridRef}
        key="grid"
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xs"
        PaperProps={{ style: { width: "100%", minHeight: "20vh" } }}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        {(currentAction?.name ?? "") === "stages" ? (
          <UpdatePriority
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </StagesAPIProvider>
  );
};

export const StageWrapper = ({
  moduleType,
  isDataChangedRef,
  handleDialogClose,
}) => {
  const { state: rows }: any = useLocation();
  return (
    <Dialog
      fullScreen
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      onClose={handleDialogClose}
    >
      <HeaderDetails
        rowData={rows?.[0]}
        handleDialogClose={handleDialogClose}
      />
      <Stage
        moduleType={moduleType}
        refID={rows[0].id}
        isDataChangedRef={isDataChangedRef}
      />
    </Dialog>
  );
};
