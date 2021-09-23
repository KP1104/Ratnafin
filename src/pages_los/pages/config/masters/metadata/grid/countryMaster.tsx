export const countryMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Zone",
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
      columnName: "Country Name",
      componentType: "default",
      sequence: 2,
      alignment: "left",
    },
  ],
};
