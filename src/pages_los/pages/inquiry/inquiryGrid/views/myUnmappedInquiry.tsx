import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [];

export const MyUnmappedInquiry = () => {
  return <Inquiry gridCode="INQ/004" actions={actions} />;
};
