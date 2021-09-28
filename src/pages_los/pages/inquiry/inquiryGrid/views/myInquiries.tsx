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
    actionName: "viewStatus",
    actionLabel: "View Status",
    multiple: false,
    rowDoubleClick: true,
  },
];
export const MyInquiry = () => {
  return (
    <Inquiry
      gridCode="INQ/004"
      actions={actions}
      basePath="/los/inquiry/myInquiry"
    />
  );
};
