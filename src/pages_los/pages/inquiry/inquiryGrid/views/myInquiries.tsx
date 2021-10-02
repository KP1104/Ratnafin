import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiryGrid";

const actions: ActionTypes[] = [
  {
    actionName: "AssignInquiry",
    actionLabel: "Assign Inquiry",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "AssignTask",
    actionLabel: "Assign Task",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "ViewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Priority",
    actionLabel: "Priority",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "MoveToLead",
    actionLabel: "Move To Lead",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "calculator",
    actionLabel: "Eligibility Calculator",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "documentUpload",
    actionLabel: "Document Details",
    multiple: false,
    rowDoubleClick: false,
  },
];
export const MyInquiry = () => {
  return <Inquiry gridCode="INQ/004" actions={actions} />;
};
