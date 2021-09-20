export const myCrossMetaData = {
  gridConfig: {
    dense: false,
    pageSize: [20, 30, 50],
    defaultPageSize: "20",
    gridLabel: "My Cross Inquiries",
    rowIdColumn: "tran_cd",
    allowColumnReordering: true,
    allowColumnHiding: true,
    allowKeyboardNavigation: true,
    allowGlobalFilter: true,
  },
  columns: [
    {
      accessor: "myCross",
      columnName: "My Cross Inquiries",
      sequence: 1,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
    },
  ],
};
