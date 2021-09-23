import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

export const AllAssignedInquiry = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "ViewStatus",
      actionLabel: "View Status",
      multiple: false,
      rowDoubleClick: true,
    },
  ];
  return <Inquiry gridCode="INQ/003" actions={actions} />;
};
