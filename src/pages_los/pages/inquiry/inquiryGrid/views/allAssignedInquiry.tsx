import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

export const AllAssignedInquiry = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "AssignInquiry",
      actionLabel: "Assign Inquiry",
      multiple: false,
      rowDoubleClick: false,
    },
  ];
  return <Inquiry gridCode="INQ/002" actions={actions} />;
};
