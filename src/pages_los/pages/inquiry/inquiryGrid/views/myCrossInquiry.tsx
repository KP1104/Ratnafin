import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [];

export const MyCrossInquiry = () => {
  return <Inquiry gridCode="INQ/007" actions={actions} />;
};
