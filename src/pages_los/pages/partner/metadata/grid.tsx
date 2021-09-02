import { GridMetaDataType } from "components/dataTableStatic";
export const partnerGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Partners",
    rowIdColumn: "refID",
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
      accessor: "firstName",
      columnName: "First Name",
      sequence: 1,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "lastName",
      columnName: "Last Name",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "mobile",
      columnName: "Mobile",
      sequence: 3,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "emailID",
      columnName: "Email",
      sequence: 4,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "occupation",
      columnName: "Occupation",
      sequence: 5,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "primaryBussInt",
      columnName: "Primary Business Interest",
      sequence: 6,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "primaryProduct",
      columnName: "Primary Product",
      sequence: 7,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "secondaryProduct",
      columnName: "Secondary Product",
      sequence: 8,
      alignment: "left",
      componentType: "default",
    },
  ],
};
