import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [];

export const MyTeamCrossInquiry = () => {
  return <Inquiry gridCode="INQ/008" actions={actions} />;
};
