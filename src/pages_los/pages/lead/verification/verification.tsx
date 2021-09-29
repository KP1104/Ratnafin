import { useContext, useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { queryClient, ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { Download } from "./download";
import { ResendMessage } from "./resendMessage";
import { ReInitiate } from "./reInitiate";
import { ExpireLink } from "./expireLink";
import { APIGrid } from "./apiGrid";
import { APIInterfaceForm } from "./apiInterface";
import { generateVerificationAPIContext, ExternalAPIProvider } from "./context";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import { useLocation } from "react-router-dom";

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
  {
    actionName: "resend",
    actionLabel: "Re-Send Message",
    multiple: false,
    shouldExclude: (rows: any) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (["PENDING"].indexOf(rows[i].data?.status) < 0) {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
  {
    actionName: "reinitiate",
    actionLabel: "Re-Initiate",
    multiple: false,
    shouldExclude: (rows: any) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (["FAILED"].indexOf(rows[i].data?.status) < 0) {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
  {
    actionName: "expireLink",
    actionLabel: "Expire Link",
    multiple: false,
    shouldExclude: (rows: any) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (["PENDING", "INITIATED"].indexOf(rows[i].data?.status) < 0) {
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
  const classes = useDialogStyles();
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
        maxWidth="xs"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
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
        ) : (currentAction?.name ?? "") === "resend" ? (
          <ResendMessage
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            row={currentAction?.rows[0] ?? undefined}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "reinitiate" ? (
          <ReInitiate
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            row={currentAction?.rows[0] ?? undefined}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "expireLink" ? (
          <ExpireLink
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            row={currentAction?.rows[0] ?? undefined}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </ExternalAPIProvider>
  );
};

export const VerificationWrapper = ({
  moduleType,
  handleDialogClose,
  goBackPath = "..",
}) => {
  const { state: rows }: any = useLocation();
  let navigate = useNavigate();
  let handleDialogCloseWrapper = useCallback(() => {
    handleDialogClose();
    navigate(goBackPath);
  }, [navigate]);
  return (
    <Dialog
      fullScreen
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
    >
      <HeaderDetails
        rowData={rows?.[0]}
        handleDialogClose={handleDialogCloseWrapper}
      />
      <Verification moduleType={moduleType} refID={rows[0].id} />
    </Dialog>
  );
};
