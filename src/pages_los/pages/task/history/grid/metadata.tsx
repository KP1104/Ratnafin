import { GridMetaDataType } from "components/dataTableStatic";

export const historyMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Task History",
    rowIdColumn: "tran_cd",
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
      columnName: "SerialNo",
      sequence: 1,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "refID",
      columnName: "Ref ID",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "subject",
      columnName: "Task",
      sequence: 3,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "type",
      columnName: "Type",
      sequence: 4,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "othersType",
      columnName: "Other Type of Task",
      sequence: 5,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "status",
      columnName: "Status",
      sequence: 6,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "dueDate",
      columnName: "Due Date",
      sequence: 7,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "completionDate",
      columnName: "Completion Date",
      sequence: 8,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "description",
      columnName: "Description",
      sequence: 9,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "taskSource",
      columnName: "Source",
      sequence: 10,
      alignment: "right",
      componentType: "default",
    },
    {
      accessor: "enteredBy",
      columnName: "Task entered By",
      sequence: 11,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "enteredDate",
      columnName: "Task Entered Date",
      sequence: 12,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "modifiedBy",
      columnName: "Modified By",
      sequence: 13,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "modifiedDate",
      columnName: "Modified Date",
      sequence: 14,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "worker",
      columnName: "Worker",
      sequence: 15,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "inquiryNo",
      columnName: "Inquiry No",
      sequence: 16,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "leadNo",
      columnName: "Lead No",
      sequence: 17,
      alignment: "left",
      componentType: "default",
    },
  ],
};
