export const campaignGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Campaign",
    rowIdColumn: "refID",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "73vh" },
    pageSizes: [10, 20, 30],
    defaultPageSize: 30,
  },
  columns: [
    {
      columnName: "Campaign Name",
      componentType: "default",
      accessor: "campaignName",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Campaign Description",
      componentType: "default",
      accessor: "description",
      sequence: 1,
      alignment: "left",
    },
  ],
};
