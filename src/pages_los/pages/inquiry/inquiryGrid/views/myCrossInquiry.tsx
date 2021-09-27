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
export const MyCrossInquiry = () => {
  return <Inquiry gridCode="INQ/008" actions={actions} />;
};
