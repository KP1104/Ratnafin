export const unmappedHOMetaData = {
  gridConfig: {
    dense: false,
    pageSize: [20, 30, 50],
    defaultPageSize: "20",
    gridLabel: "Unmapped Inquiries HO",
    rowIdColumn: "tran_cd",
    allowColumnReordering: true,
    allowColumnHiding: true,
    allowKeyboardNavigation: true,
    allowGlobalFilter: true,
  },
  columns: [
    {
      accessor: "unmappedHO",
      columnName: "Unmapped Inquiries HO",
      sequence: 1,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
    },
  ],
};
