import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [];

export const MyInquiry = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "AssignInquiry",
      actionLabel: "Assign Inquiry",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "ViewStatus",
      actionLabel: "View Status",
      multiple: false,
      rowDoubleClick: true,
    },
  ];
  return <Inquiry gridCode="INQ/004" actions={actions} />;
};
