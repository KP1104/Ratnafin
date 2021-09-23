import { useRef, useContext, useEffect, FC } from "react";
import * as API from "../api";
import { API as CRUD2API } from "pages_los/common/crud2";
import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import { CRUDContextProvider, GridCRUD } from "pages_los/common";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

interface RegionMasterFnType {
  closeDialog: any;
  bankCode: string;
  bankName: string;
}

const RegionMasterCrudAPIArgs = (moduleType, refID) => ({
  context: {
    moduleType,
    refID,
  },
  insertFormData: {
    fn: API.insertMastersData,
    args: { moduleType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, refID },
  },
  deleteFormData: {
    fn: API.deleteMastersData,
    args: { moduleType, refID },
  },
  updateFormData: {
    fn: API.updateMastersData,
    args: { moduleType, refID },
  },
  getFormData: {
    fn: API.getMastersFormData,
    args: { moduleType, refID },
  },
  getGridFormData: {
    fn: API.getMastersGridData,
    args: { moduleType, refID },
  },
  getFormMetaData: {
    fn: API.getMastersFormMetaData,
    args: { moduleType, refID },
  },
  getGridFormMetaData: {
    fn: API.getMastersGridMetaData,
    args: { moduleType, refID },
  },
});

export const RegionMaster = ({}) => {
  const isDataEditedRef = useRef(false);
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
      <CRUDContextProvider {...RegionMasterCrudAPIArgs("region", "")}>
        <GridCRUD
          isDataChangedRef={isDataEditedRef}
          maxWidth="xs"
          dialogAlignTop={true}
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

export const RegionMasterWrapper: FC<RegionMasterFnType> = ({
  closeDialog,
  bankCode,
  bankName,
}) => {
  {
    console.log(bankCode);
  }
  return (
    <ClearCacheProvider>
      <Toolbar variant="dense">
        <Typography component="h3" variant="h4" color="primary">
          Region: {bankName}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </Toolbar>

      <RegionMaster /* bankCode={bankCode}  */ />
    </ClearCacheProvider>
  );
};
