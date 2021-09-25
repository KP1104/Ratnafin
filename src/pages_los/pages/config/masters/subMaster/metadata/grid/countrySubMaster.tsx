export const countryZoneMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Zones",
    rowIdColumn: "zoneCode",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Zone Name",
      componentType: "default",
      accessor: "zoneName",
      sequence: 1,
      alignment: "left",
    },
  ],
};
