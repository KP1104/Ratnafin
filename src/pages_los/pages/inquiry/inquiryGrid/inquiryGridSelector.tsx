import { useContext } from "react";
import { AuthContext } from "pages_los/auth";
import { InquiryGrid } from "./inquiryGrid";
import { actionPicker } from "./actions";

export const InquiryGridSelector = ({ gridCode }) => {
  const users = useContext(AuthContext);
  let actions = actionPicker(Number(users.authState.role), gridCode);
  return <InquiryGrid gridCode={gridCode} actions={actions} />;
};
