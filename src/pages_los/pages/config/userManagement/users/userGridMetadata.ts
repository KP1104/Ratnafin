export const UserGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Users",
    rowIdColumn: "userID",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    hideHeader: false,
    containerHeight: {
      min: "40vh",
      max: "70vh",
    },
    enablePagination: true,
  },
  columns: [
    {
      columnName: "User ID",
      componentType: "default",
      accessor: "userID",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "User Name",
      componentType: "default",
      accessor: "userName",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Base Branch Name",
      componentType: "default",
      accessor: "baseBranchName",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Designation",
      componentType: "default",
      accessor: "roleName",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Branches Allocated",
      componentType: "default",
      accessor: "accessBranchList",
      sequence: 4,
      alignment: "left",
    },
  ],
};
