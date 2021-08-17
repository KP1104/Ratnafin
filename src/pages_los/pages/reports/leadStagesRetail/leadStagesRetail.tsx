import { useState } from "react";
import Report from "components/report";
import { columns } from "./metadata";
//import makeData from "../generateData";
import { transformData, data } from "./transformData";

export const LeadStagesRetail = () => {
  const [myData] = useState(() => transformData(data));
  return (
    <Report
      columns={columns}
      label="Demo"
      disableFilters
      maxHeight="340px"
      data={myData}
    />
  );
};
