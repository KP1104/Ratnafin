import { useState } from "react";
import Report from "components/report";
import { columns } from "./metadata";
import { transformData } from "./transformData";
import { data } from "./data";

export const LeadStagesRetail = () => {
  const [myData] = useState(() => transformData(data));
  return (
    <Report
      columns={columns}
      disableFilters
      maxHeight="68vh"
      data={myData}
      title="leadStagesSMECF"
    />
  );
};
