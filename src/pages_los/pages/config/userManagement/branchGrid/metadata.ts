export const BranchGridMetaData = {
  columns: [
    {
      columnName: "Branch Code",
      componentType: "default",
      accessor: "branchCode",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Branch Name",
      componentType: "default",
      accessor: "branchName",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Team Assigned",
      componentType: "default",
      accessor: "teamAssign",
      sequence: 6,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Branches Assigned",
    rowIdColumn: "branchCode",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    hideHeader: false,
    disableGroupBy: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};
