import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

export const AssignedInquiry = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "assignInquiry",
      actionLabel: "Assign Inquiry",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "assignTask",
      actionLabel: "Assign Task",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "viewDetails",
      actionLabel: "View Details",
      multiple: false,
      rowDoubleClick: true,
    },
    {
      actionName: "priority",
      actionLabel: "Priority",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "moveToLead",
      actionLabel: "Move To Lead",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "calculator",
      actionLabel: "Eligibility Calculator",
      multiple: false,
      rowDoubleClick: false,
      shouldExclude: (rows) => {
        let exclude = true;
        if (["12300001", "12300002"].indexOf(rows[0].data?.product_type) >= 0) {
          exclude = false;
        }
        return exclude;
      },
    },
    {
      actionName: "documentUpload",
      actionLabel: "Document Details",
      multiple: false,
      rowDoubleClick: false,
    },
  ];
  return <Inquiry gridCode="TRN/006" actions={actions} />;
};
