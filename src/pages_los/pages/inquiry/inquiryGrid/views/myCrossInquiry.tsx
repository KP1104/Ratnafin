import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiryGrid";

const actions: ActionTypes[] = [
  {
    actionName: "viewStatus",
    actionLabel: "View Status",
    multiple: false,
    rowDoubleClick: true,
  },
];
export const MyCrossInquiry = () => {
  return (
    <Inquiry
      gridCode="INQ/008"
      actions={actions}
      basePath="/los/inquiry/myCrossInquiries"
    />
  );
};
