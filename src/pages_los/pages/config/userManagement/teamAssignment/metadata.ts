export const TeamMemebersMetaData = {
  columns: [
    {
      columnName: "Sr No",
      componentType: "default",
      accessor: "id",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Team Member Name",
      componentType: "default",
      accessor: "teamUserName",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Team Member Designation",
      componentType: "default",
      accessor: "teamUserRole",
      sequence: 3,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Team",
    rowIdColumn: "id",
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
