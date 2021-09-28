import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiryGrid";

const actions: ActionTypes[] = [
  {
    actionName: "assignInquiry",
    actionLabel: "Assign Inquiry",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "viewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const IncomingInquiry = () => {
  return (
    <Inquiry
      gridCode="INQ/002"
      actions={actions}
      basePath="los/inquiry/incomingInquiries"
    />
  );
};
