export const regionBranchMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Branches",
    rowIdColumn: "branchID",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Branch Name",
      componentType: "default",
      accessor: "branchName",
      sequence: 1,
      alignment: "left",
    },
  ],
};
