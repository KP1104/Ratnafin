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

export const CrossInquiry = () => {
  return <Inquiry gridCode="TRN/007" actions={actions} />;
};
