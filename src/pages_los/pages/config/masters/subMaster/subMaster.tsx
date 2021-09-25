import { useContext, useEffect, FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { ClearCacheContext, queryClient } from "cache";
import { useLocation } from "react-router-dom";
import { CRUDContextProvider, GridCRUD } from "pages_los/common";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { Transition } from "pages_los/common";
import { API as CRUD2API } from "pages_los/common/crud2";
import * as API from "./api";

const zoneMasterCrudAPIArgs = (moduleType, refID) => ({
  context: {
    moduleType,
    refID,
  },
  insertFormData: {
    fn: API.insertBranchData,
    args: { moduleType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, refID },
  },
  deleteFormData: {
    fn: API.deleteBranchData,
    args: { moduleType, refID },
  },
  updateFormData: {
    fn: API.updateBranchData,
    args: { moduleType, refID },
  },
  getFormData: {
    fn: API.getFormData,
    args: { moduleType, refID },
  },
  getGridFormData: {
    fn: API.getGridData,
    args: { moduleType, refID },
  },
  getFormMetaData: {
    fn: API.getFormMetaData,
    args: { moduleType, refID },
  },
  getGridFormMetaData: {
    fn: API.getGridMetaData,
    args: { moduleType, refID },
  },
});

const SubMaster: FC<any> = ({ code, moduleType, isDataChangedRef }) => {
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
    <div>
      <CRUDContextProvider {...zoneMasterCrudAPIArgs(moduleType, code)}>
        <GridCRUD
          isDataChangedRef={isDataChangedRef}
          dialogAlignTop={true}
          maxWidth="xs"
          formStyle={{
            background: "white",
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: "30vh",
          }}
        />
      </CRUDContextProvider>
    </div>
  );
};

export const SubMasterWrapper = ({
  closeDialog,
  moduleType,
  isDataChangedRef,
  heading,
}) => {
  const { state: rows }: any = useLocation();
  const classes = useDialogStyles();
  const code = rows[0]?.id;
  const name = rows[0]?.data;
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
      />
    </Dialog>
  );
};
