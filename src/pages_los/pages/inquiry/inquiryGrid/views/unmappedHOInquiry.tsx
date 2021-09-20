import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [];

export const UnmappedHOInquiry = () => {
  return <Inquiry gridCode="INQ/006" actions={actions} />;
};
