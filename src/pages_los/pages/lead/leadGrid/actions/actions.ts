import { ActionTypes } from "components/dataTable";

interface extendedType {
  __VISIBLE_GRID_CODE__?: any;
  __VISIBLE_FOR_ROLES__?: any;
}
type MyActionTypes = ActionTypes & extendedType;

export const actions: MyActionTypes[] = [
  {
    actionName: "detail-view",
    actionLabel: "Detail View",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "stages",
    actionLabel: "Lead Stages",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "lead-assign-business",
    actionLabel: "Lead Assign Business",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "lead-assign-credit",
    actionLabel: "Lead Assign Credit",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "task-assign",
    actionLabel: "Assign Task",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "verification",
    actionLabel: "Verification and Credit Score",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "analysis",
    actionLabel: "Ratnaafin Analysis",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "cam",
    actionLabel: "CAM",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "view-mandate",
    actionLabel: "Mandate",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "bank-login",
    actionLabel: "Bank Login",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "audit-download",
    actionLabel: "Audit Download",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "sanction",
    actionLabel: "Sanction",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "disbursement",
    actionLabel: "Disbursement",
    multiple: false,
    rowDoubleClick: true,
  },
];
