import { useRef, useEffect, Fragment, useCallback, useContext } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";
import { UserGridMetaData } from "./userGridMetadata";
import * as API from "./api";
import { AddUser } from "./userAdd";
import { ViewEditUser } from "./userViewEdit";

const actions: ActionTypes[] = [
  {
    actionName: "view",
    actionLabel: "Edit User",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "add",
    actionLabel: "Add User",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "team",
    actionLabel: "Team Management",
    multiple: false,
  },
];

export const UserManagement = () => {
  const navigate = useNavigate();

  const isMyDataChangedRef = useRef(false);
  const removeCache = useContext(ClearCacheContext);
  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const result = useQuery(
    ["getUserGridData", "users/employee/role"],
    API.getUserGridData
  );
  const closeMyDialog = () => {
    navigate("./");
    if (isMyDataChangedRef.current === true) {
      result.refetch();
      isMyDataChangedRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries(["getUserGridData", "users/employee/role"]);
    };
  }, [removeCache]);

  return (
    <Fragment>
      <GridWrapper
        key={`usersGrid`}
        finalMetaData={UserGridMetaData as any}
        data={result.data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={result.isLoading || result.isFetching}
      />
      <Routes>
        <Route
          path="/add"
          element={
            <AddUser
              isDataChangedRef={isMyDataChangedRef}
              closeHandler={closeMyDialog}
            />
          }
        />
        <Route
          path="/view"
          element={
            <ViewEditUser
              isDataChangedRef={isMyDataChangedRef}
              closeHandler={closeMyDialog}
            />
          }
        />
        <Route path="/team" element={null} />
      </Routes>
    </Fragment>
  );
};

export const UserManagementWrapper = () => (
  <ClearCacheProvider>
    <UserManagement />
  </ClearCacheProvider>
);
