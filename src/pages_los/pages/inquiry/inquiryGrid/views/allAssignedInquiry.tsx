import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [
  {
    actionName: "viewStatus",
    actionLabel: "View Status",
    multiple: false,
    rowDoubleClick: true,
  },
];
export const AllAssignedInquiry = () => {
  return <Inquiry gridCode="INQ/003" actions={actions} />;
};
