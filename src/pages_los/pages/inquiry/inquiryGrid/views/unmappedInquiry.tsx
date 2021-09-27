import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiryGrid";

const actions: ActionTypes[] = [
  {
    actionName: "assignBranch",
    actionLabel: "Assign Branch",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "viewDetailsReadOnly",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const UnmappedInqiry = () => {
  return <Inquiry gridCode="INQ/006" actions={actions} />;
};
