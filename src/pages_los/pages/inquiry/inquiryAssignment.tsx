import { HeaderDetails } from "./headerDetails";
import { AssignmentWrapper } from "pages_los/pages/common/assignment";

export const InquiryAssignment = (props) => {
  return (
    <AssignmentWrapper HeaderDetailsComponent={HeaderDetails} {...props} />
  );
};
