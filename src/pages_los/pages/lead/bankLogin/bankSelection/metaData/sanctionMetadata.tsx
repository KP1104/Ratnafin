import { GridMetaDataType } from "components/dataTableStatic";

export const BankSanctionGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Bank Sanction",
    rowIdColumn: "branchID",
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
  columns: [
    {
      accessor: "bankName",
      columnName: "Bank Name",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 250,
    },

    {
      accessor: "branchID",
      columnName: "Branch ID",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "priority",
      columnName: "Priority",
      sequence: 3,
      alignment: "left",
      componentType: "default",
    },
  ],
};
