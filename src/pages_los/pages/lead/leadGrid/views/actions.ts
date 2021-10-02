import { ActionTypes } from "components/dataTable";

interface extendedType {
  __VISIBLE_FOR__?: any;
  __VISIBLE_FOR_ROLES__?: any;
}
type MyActionTypes = ActionTypes & extendedType;

const stages = {
  bankLogin: true,
  disbursement: true,
  lead: true,
  mandate: true,
  sanction: true,
};

const actions: MyActionTypes[] = [
  {
    actionName: "detailView",
    actionLabel: "Detail View",
    multiple: false,
    rowDoubleClick: true,
    __VISIBLE_FOR__: [stages.lead],
    __VISIBLE_FOR_ROLES__: [],
  },
  {
    actionName: "stages",
    actionLabel: "Lead Stages",
    multiple: false,
    rowDoubleClick: false,
    __VISIBLE_FOR__: [stages.lead],
  },

  {
    actionName: "leadAssignBusiness",
    actionLabel: "Lead Assign Business",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "leadAssignCredit",
    actionLabel: "Lead Assign Credit",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "taskAssign",
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
    actionName: "viewMandate",
    actionLabel: "Mandate",
    multiple: false,
    rowDoubleClick: true,
    __VISIBLE_FOR__: [stages.mandate],
  },
  {
    actionName: "bankLogin",
    actionLabel: "Bank Login",
    multiple: false,
    rowDoubleClick: true,
    __VISIBLE_FOR__: [stages.bankLogin],
  },
  {
    actionName: "auditDownload",
    actionLabel: "Audit Download",
    multiple: false,
    rowDoubleClick: false,
    __VISIBLE_FOR__: [stages.bankLogin],
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
