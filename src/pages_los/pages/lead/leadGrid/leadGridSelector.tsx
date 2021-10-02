import { useContext } from "react";
import { AuthContext } from "pages_los/auth";
import { LeadGrid } from "./leadGrid";
import { actionPicker } from "./actions";

export const LeadGridSelector = ({ gridCode }) => {
  const users = useContext(AuthContext);
  let actions = actionPicker(Number(users.authState.role), gridCode);
  return <LeadGrid gridCode={gridCode} actions={actions} />;
};
