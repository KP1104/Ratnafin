export const countryMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Country",
    rowIdColumn: "code",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Country Code",
      componentType: "default",
      accessor: "code",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Country Name",
      componentType: "default",
      accessor: "countryName",
      sequence: 2,
      alignment: "left",
    },
  ],
};
