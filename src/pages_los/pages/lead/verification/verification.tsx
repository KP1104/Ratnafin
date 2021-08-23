import { useContext, useRef, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { queryClient, ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { Download } from "./download";
import { APIGrid } from "./apiGrid";
import { APIInterfaceForm } from "./apiInterface";
import { generateVerificationAPIContext, ExternalAPIProvider } from "./context";

const actions: ActionTypes[] = [
  {
    actionName: "inititate",
    actionLabel: "Inititate Verification",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "download",
    actionLabel: "Download",
    multiple: false,
    shouldExclude: (rows: any) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (
          ["SUCCESS"].indexOf(rows[i].data?.downloadStatus) < 0 ||
          ["CREDIT"].indexOf(rows[i].data?.requestType) < 0
        ) {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
];

export const Verification = ({ refID, moduleType }) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const removeCache = useContext(ClearCacheContext);
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
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
  }, [removeCache, moduleType, refID]);

  return (
    <ExternalAPIProvider
      {...generateVerificationAPIContext({ refID, moduleType })}
    >
      <APIGrid
        ref={gridRef}
        key="grid"
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        {(currentAction?.name ?? "") === "inititate" ? (
          <APIInterfaceForm
            refID={refID}
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "download" ? (
          <Download
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            row={currentAction?.rows[0] ?? undefined}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </ExternalAPIProvider>
  );
};
