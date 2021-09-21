import { components } from "components/report";

export const auditMetadata = [
  {
    columnName: "Serial No",
    accessor: "serialNo",
    id: "serialNo",
    width: 200,
  },
  {
    columnName: "Conditon Result",
    accessor: "conditionResult",
    id: "conditionResult",
    width: 400,
    Cell: components.DefaultCell,
  },
  {
    columnName: "Status",
    accessor: "status",
    id: "status",
    width: 200,
  },
  {
    columnName: "Entered By",
    accessor: "enteredBy",
    id: "enteredBy",
    width: 250,
  },
  {
    columnName: "Entered Date",
    accessor: "enteredDate",
    id: "enteredDate",
    width: 250,
    Cell: components.DateCell,
  },
];
