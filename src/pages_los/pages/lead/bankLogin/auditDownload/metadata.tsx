import { components, filters } from "components/report";

export const auditMetadata = [
  {
    columnName: "Promoter Serial No",
    accessor: "pramotorSerialNo",
    id: "pramotorSerialNo",
    width: 200,
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
