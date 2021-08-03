import { ActionCell } from "./components/actionCell";
import { EditableTextField } from "./components/textField";
import { DefaultHeaderColumnRenderer } from "./components/defaultHeaderColumnRenderer";

const metaData = {
  columns: [
    {
      accessor: "name",
      Header: DefaultHeaderColumnRenderer,
      alignment: "left",
      width: 200,
      Cell: EditableTextField,
      columnName: "Name",
    },
    {
      accessor: "age",
      Header: DefaultHeaderColumnRenderer,
      alignment: "left",
      width: 100,
      Cell: EditableTextField,
      columnName: "Age",
    },
    {
      accessor: "editAccess",
      Header: DefaultHeaderColumnRenderer,
      alignment: "left",
      width: 100,
      Cell: ActionCell,
      columnName: "Action",
    },
  ],
};

export default metaData;
