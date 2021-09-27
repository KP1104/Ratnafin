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

export const UnmappedHOInquiry = () => {
  return <Inquiry gridCode="INQ/007" actions={actions} />;
};
