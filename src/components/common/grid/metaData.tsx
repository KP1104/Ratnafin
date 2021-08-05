import { ActionCell } from "./components/actionCell";
import { EditableTextField } from "./components/textField";
import { DefaultHeaderColumnRenderer } from "./components/defaultHeaderColumnRenderer";
import { DefaultCellRender } from "./components/defaultCell";
import { DefaultFooterCell } from "./components/footerCell";

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
      alignment: "right",
      width: 100,
      Cell: EditableTextField,
      columnName: "Age",
      Footer: DefaultFooterCell,
    },
    {
      accessor: "cummulativeAge",
      Header: DefaultHeaderColumnRenderer,
      alignment: "right",
      width: 130,
      columnName: "Cummulative Age",
      Cell: DefaultCellRender,
      Footer: DefaultFooterCell,
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
