import { GridMetaDataType } from "components/dataTableStatic";
export const assignPincodeGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Pincode",
    rowIdColumn: "pincode",
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
      accessor: "branchName",
      columnName: "Branch Name",
      sequence: 1,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "pincode",
      columnName: "Pincode",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
  ],
};
