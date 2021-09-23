import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [];

export const UnmappedHOInquiry = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "ViewStatus",
      actionLabel: "View Status",
      multiple: false,
      rowDoubleClick: true,
    },
  ];
  return <Inquiry gridCode="INQ/007" actions={actions} />;
};
