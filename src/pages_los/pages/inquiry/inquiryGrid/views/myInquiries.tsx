import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [];

export const MyInquiry = () => {
  return <Inquiry gridCode="INQ/003" actions={actions} />;
};
