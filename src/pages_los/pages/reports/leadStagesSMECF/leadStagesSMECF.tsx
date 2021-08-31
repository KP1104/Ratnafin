import { useState } from "react";
import { useQuery } from "react-query";
import Report from "components/report";
import { columns } from "./metadata";
import { transformData } from "./transformData";

import { getLeadStagesSMECFData } from "../api";

export const LeadStagesSMECF = () => {
  const [myData, setMyData] = useState([]);
  const query = useQuery<any, any>(
    "getLeadStagesSMECFData",
    getLeadStagesSMECFData,
    {
      onSuccess: (data) => {
        setMyData(transformData(data));
      },
      cacheTime: 0,
    }
  );

  return query.isError ? (
    <span>{query.error?.error_msg}</span>
  ) : (
    <Report
      columns={columns}
      disableFilters
      maxHeight={window.innerHeight - 250}
      data={myData}
      title="Lead Stages SME & CF"
      initialState={{
        groupBy: ["particulars"],
      }}
      options={{
        disableGroupBy: true,
      }}
      loading={query.isLoading}
    />
  );
};
