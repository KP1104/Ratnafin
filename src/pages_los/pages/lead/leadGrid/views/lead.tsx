import { LeadGrid } from "../leadGrid";
import { ActionTypes } from "components/dataTable";

export const Leads = () => {
  //@ts-ignore

  const actions: ActionTypes[] = [
    {
      actionName: "leadAssign",
      actionLabel: "Lead Assign",
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
      actionName: "detailView",
      actionLabel: "Detail View",
      multiple: false,
      rowDoubleClick: true,
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
      actionName: "stages",
      actionLabel: "Lead Stages",
      multiple: false,
      rowDoubleClick: false,
    },
  ];

  return (
    <LeadGrid
      gridCode="TRN/003"
      actions={actions}
      basePath="/los/lead/bankLogin"
    />
  );
};
