import { LeadGrid } from "../leadGrid";
import { ActionTypes } from "components/dataTable";

export const MandateLeads = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "viewMandate",
      actionLabel: "Mandate",
      multiple: false,
      rowDoubleClick: true,
    },
  ];

  return (
    <LeadGrid
      gridCode="TRN/010"
      actions={actions}
      basePath="/los/lead/mandate"
    />
  );
};
