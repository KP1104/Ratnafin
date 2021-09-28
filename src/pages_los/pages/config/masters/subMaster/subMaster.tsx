import {
  useContext,
  useEffect,
  FC,
  useCallback,
  Fragment,
  useRef,
  useState,
} from "react";
import loaderGif from "assets/images/loader.gif";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { ClearCacheContext, queryClient } from "cache";
import { useQueries } from "react-query";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { Transition } from "pages_los/common";
import GridWrapper from "components/dataTableStatic";
import { ActionTypes } from "components/dataTable";
import { AddSubMasterWrapper, SubMasterDeleteWrapper } from "./crud";
import * as API from "./api";

const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
];

const SubMaster: FC<any> = ({
  code,
  moduleType,
  isDataChangedRef,
  closeDialog,
}) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);

  const result = useQueries([
    {
      queryKey: ["getGridMetaData", moduleType, "edit"],
      queryFn: () => API.getGridMetaData({ moduleType, type: "edit" }),
    },
    {
      queryKey: ["getGridData", moduleType, code],
      queryFn: () => API.getGridData({ moduleType, code: code }),
    },
  ]);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      result[1]?.refetch();
      isDataChangedRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getGridMetaData", moduleType, "edit"]);
      queryClient.removeQueries(["getGridData", moduleType, code]);
    };
  }, []);

  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[0].isFetching ||
    result[1].isFetching;
  let isError = result[0].isError || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg} ${
    //@ts-ignore
    result[1].error?.error_msg
  }`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  const renderResult = loading ? (
    <div>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <Fragment>
      <GridWrapper
        key="subMaster"
        finalMetaData={result[0]?.data as any}
        data={result[1].data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={loading}
        refetchData={() => result[1].refetch()}
      />
      <RegionSubMasterActionWrapper
        moduleType={moduleType}
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
        currentAction={currentAction}
        code={code}
      />
    </Fragment>
  );
  return renderResult;
};

const RegionSubMasterActionWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  currentAction,
  code,
}) => {
  return (currentAction?.name ?? "") === "add" ? (
    <AddSubMasterWrapper
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      moduleType={moduleType}
      code={code}
    />
  ) : (currentAction?.name ?? "") === "delete" ? (
    <SubMasterDeleteWrapper
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      moduleType={moduleType}
      details={currentAction?.rows}
    />
  ) : null;
};

export const SubMasterWrapper = ({
  closeDialog,
  moduleType,
  isDataChangedRef,
  heading,
  data,
}) => {
  const classes = useDialogStyles();
  const code = data[0]?.id;
  const name = data[0]?.data;

  return (
    <Dialog
      fullWidth
      open={true}
      maxWidth="lg"
      //@ts-ignore
      TransitionComponent={Transition}
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <Toolbar variant="dense">
        <Typography component="h3" variant="h4" color="primary">
          {heading}:
          {name?.regionName ?? name?.zoneName ?? name?.countryName ?? "-"}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </Toolbar>

      <SubMaster
        code={code}
        moduleType={moduleType}
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};
