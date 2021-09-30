import { useRef, useState, FC, Fragment, useMemo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { TeamMemebersMetaData } from "./metadata";
import * as API from "./api";
import { AddMember } from "./addMember";
import { ClearCacheProvider } from "cache";

const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add Member",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "delete",
    actionLabel: "Remove Member",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const TeamGrid: FC<{
  isDataChangedRef: any;
  closeDialog: any;
  userID: any;
  branchCode: any;
  userRole: any;
  userName: any;
  userRoleName: any;
  userBranchName: any;
}> = ({
  isDataChangedRef,
  closeDialog,
  userID,
  branchCode,
  userRole,
  userBranchName,
  userName,
  userRoleName,
}) => {
  let [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["getUserTeamData", { userID, branchCode }],
    API.getUserTeamData
  );
  const modifiedData = useMemo(() => modifyData(data), [data]);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      isMyDataChangedRef.current = true;
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
              {userName} - {userRoleName} - {userBranchName}
            </Typography>
          </Fragment>
        ) : null}
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </div>
      <GridWrapper
        key="teamMembersGrid"
        ref={gridRef}
        actions={actions}
        setAction={setCurrentAction}
        finalMetaData={TeamMemebersMetaData as any}
        data={modifiedData ?? []}
        loading={isLoading || isFetching}
        setData={(data) => data}
        refetchData={refetch}
      />
      <ClearCacheProvider>
        {currentAction?.name === "add" ? (
          <AddMember
            isDataChangedRef={isMyDataChangedRef}
            closeDialog={closeMyDialog}
            userID={userID}
            branchCode={branchCode}
            userRole={userRole}
          />
        ) : null}
      </ClearCacheProvider>
    </Dialog>
  );
};

let modifyData = (rows) => {
  if (Array.isArray(rows)) {
    return rows.map((one, index) => {
      return { ...one, id: index + 1 };
    });
  } else {
    return [];
  }
};
