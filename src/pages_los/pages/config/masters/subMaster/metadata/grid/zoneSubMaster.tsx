export const zoneRegionMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Region",
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
      columnName: "Region Code",
      componentType: "default",
      accessor: "subCode",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Region Name",
      componentType: "default",
      accessor: "zoneRegionName",
      sequence: 2,
      alignment: "left",
    },
  ],
};
