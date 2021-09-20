export const allAssignedMetaData = {
  gridConfig: {
    dense: false,
    pageSize: [20, 30, 50],
    defaultPageSize: "20",
    gridLabel: "All Assigned Inquiries",
    rowIdColumn: "tran_cd",
    allowColumnReordering: true,
    allowColumnHiding: true,
    allowKeyboardNavigation: true,
    allowGlobalFilter: true,
  },
  columns: [
    {
      accessor: "assignedInquiry",
      columnName: "All Assgined Inquiry",
      sequence: 1,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
    },
  ],
};
