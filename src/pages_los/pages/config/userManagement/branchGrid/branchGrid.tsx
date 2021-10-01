import { useRef, useState, FC, Fragment, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { BranchGridMetaData } from "./metadata";
import * as API from "./api";
import { useLocation } from "react-router-dom";
import { TeamGrid } from "../teamAssignment";
import { queryClient } from "cache";
import { useNavigate } from "react-router";

const actions: ActionTypes[] = [
  {
    actionName: "team",
    actionLabel: "Team Details",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const BranchGrid: FC<{
  isDataChangedRef: any;
  closeDialog: any;
  goBackPath?: any;
}> = ({ isDataChangedRef, closeDialog, goBackPath = ".." }) => {
  let [currentAction, setCurrentAction] = useState<any>(null);
  const navigate = useNavigate();
  const handleDialogCloseWrapper = useCallback(() => {
    closeDialog();
    navigate(goBackPath);
  }, [navigate]);
  const { state: rows } = useLocation();
  let userID = rows?.[0]?.id;
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["getUserAssignedBranchesData", { userID }],
    API.getUserAssignedBranchesData
  );
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getUserAssignedBranchesData", { userID }]);
    };
  }, []);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      isMyDataChangedRef.current = false;
    }
  };
  return (
    <Dialog open={true} fullScreen>
      <div style={{ display: "flex" }}>
        {!isLoading ? (
          <Fragment>
            <div style={{ padding: "8px 8px" }} />
            <Typography variant="h4" color="secondary">
              {data?.[0]?.userName} - {data?.[0]?.userRole}
            </Typography>
          </Fragment>
        ) : null}
        <div style={{ flexGrow: 1 }} />
        <Button onClick={handleDialogCloseWrapper}>Close</Button>
      </div>
      <GridWrapper
        key="userAssignedBranches"
        ref={gridRef}
        actions={actions}
        setAction={setCurrentAction}
        finalMetaData={BranchGridMetaData as any}
        data={data ?? []}
        loading={isLoading || isFetching}
        setData={(data) => data}
        refetchData={refetch}
      />
      {currentAction?.name === "team" ? (
        <TeamGrid
          userID={userID}
          branchCode={currentAction?.rows?.[0]?.id}
          isDataChangedRef={isMyDataChangedRef}
          closeDialog={closeMyDialog}
          userRole={currentAction?.rows?.[0]?.data?.userRoleCode}
          userName={currentAction?.rows?.[0]?.data?.userName}
          userRoleName={currentAction?.rows?.[0]?.data?.roleName}
          userBranchName={currentAction?.rows?.[0]?.data?.branchName}
        />
      ) : null}
    </Dialog>
  );
};
