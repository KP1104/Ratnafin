export const unsecureGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Bank Master of Unsecured",
    rowIdColumn: "refID",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    disableSorting: true,
    hideHeader: false,
    disableGroupBy: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Serial No",
      componentType: "default",
      accessor: "refID",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Name of Bank - Branch",
      componentType: "default",
      accessor: "branchID",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Product Name",
      componentType: "default",
      accessor: "productName",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Min Age",
      componentType: "default",
      accessor: "minAge",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Max Age",
      componentType: "default",
      accessor: "maxAge",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Experiance",
      componentType: "default",
      accessor: "experience",
      sequence: 5,
      alignment: "left",
    },
    {
      columnName: "Industry Type",
      componentType: "default",
      accessor: "typeOfIndustry",
      sequence: 6,
      alignment: "left",
      isVisible: false,
    },
    {
      columnName: "Sub Type Of Industry Type",
      componentType: "default",
      accessor: "subTypeOfIndustry",
      sequence: 7,
      alignment: "left",
      isVisible: false,
    },
    {
      columnName: "Ratnaafin Branch Name",
      componentType: "default",
      accessor: "bankBranchName",
      sequence: 8,
      alignment: "left",
    },
  ],
};
