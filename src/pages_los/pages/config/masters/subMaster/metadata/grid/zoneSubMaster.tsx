export const zoneRegionMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Region",
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
      columnName: "Region Name",
      componentType: "default",
      accessor: "regionName",
      sequence: 1,
      alignment: "left",
    },
  ],
};
