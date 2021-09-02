import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";
import { useContext } from "react";
import { AuthContext } from "auth";

export const AssignedInquiry = () => {
  const authCtx = useContext(AuthContext);
  const role = authCtx?.authState.role ?? [];
  const actions: ActionTypes[] = [
    {
      actionName: "AssignInquiry",
      actionLabel: "Assign Inquiry",
      multiple: false,
      rowDoubleClick: false,
      shouldExclude: (rows) => {
        let exclude = false;
        for (let i = 0; i < rows.length; i++) {
          let currentBranchCode = `${rows[i].data?.branch_cd}`.trim();
          if (Array.isArray(role) && role.length > 0) {
            let currentRole = role.find(
              (one) => one.branchCode === currentBranchCode
            );
            if (currentRole !== undefined) {
              //role 3 & 4 is BDM & BDE
              if ([4].indexOf(currentRole?.roleTranCode) >= 0) {
                exclude = true;
                break;
              }
            }
          }
        }
        return exclude;
      },
    },
    {
      actionName: "AssignTask",
      actionLabel: "Assign Task",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "ViewDetails",
      actionLabel: "View Details",
      multiple: false,
      rowDoubleClick: true,
    },
    {
      actionName: "Priority",
      actionLabel: "Priority",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "MoveToLead",
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
