import {
  useRef,
  useEffect,
  Fragment,
  useCallback,
  useContext,
  useMemo,
} from "react";
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
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["getUserGridData", "users/employee/role"],
    API.getUserGridData
  );

  const modifiedData = useMemo(() => modifyData(data), [data]);

  const closeMyDialog = () => {
    navigate("./");
    if (isMyDataChangedRef.current === true) {
      refetch();
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
        data={modifiedData ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
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

const modifyData = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((one) => {
    const { accessBranchList, accessCategoryList, userStatus, ...others } = one;
    let newAccessBranchList = accessBranchList
      .map((one) => one.entityName)
      .join(",");
    let newAccessCategoryList = accessCategoryList
      .map((one) => one.categoryName)
      .join(",");
    return {
      ...others,
      accessBranchList: newAccessBranchList,
      accessCategoryList: newAccessCategoryList,
      userStatus: userStatus === "Y" ? "Active" : "In Active",
    };
  });
};
