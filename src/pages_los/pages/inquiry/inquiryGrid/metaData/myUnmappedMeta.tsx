export const myUnmappedMetaData = {
  gridConfig: {
    dense: false,
    pageSize: [20, 30, 50],
    defaultPageSize: "20",
    gridLabel: "My Unmapped Inquiries",
    rowIdColumn: "tran_cd",
    allowColumnReordering: true,
    allowColumnHiding: true,
    allowKeyboardNavigation: true,
    allowGlobalFilter: true,
  },
  columns: [
    {
      accessor: "myUnmapped",
      columnName: "My Unmapped Inquiries",
      sequence: 1,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
    },
  ],
};
