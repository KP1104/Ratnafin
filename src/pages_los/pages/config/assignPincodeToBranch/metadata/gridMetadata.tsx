import { GridMetaDataType } from "components/dataTableStatic";
export const assignPincodeGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Pincode",
    rowIdColumn: "null",
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
      accessor: "serialNo",
      columnName: "Serial No",
      sequence: 1,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "branchName",
      columnName: "Branch Name",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "branchCode",
      columnName: "Branch Code",
      sequence: 3,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "pincode",
      columnName: "Pincode",
      sequence: 4,
      alignment: "left",
      componentType: "default",
    },
  ],
};
