export const regionBranchMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Branches",
    rowIdColumn: "subCode",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Branch Code",
      componentType: "default",
      accessor: "subCode",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Branch Name",
      componentType: "default",
      accessor: "regionBranchName",
      sequence: 2,
      alignment: "left",
    },
  ],
};
