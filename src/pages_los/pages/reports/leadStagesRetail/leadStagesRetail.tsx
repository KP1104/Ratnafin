import { useState } from "react";
import { useQuery } from "react-query";
import Report from "components/report";
import { columns } from "./metadata";

import { getLeadStagesRetailData } from "../api";

export const LeadStagesRetail = () => {
  const [myData, setMyData] = useState([]);
  const query = useQuery<any, any>(
    "getLeadStagesRetailData",
    getLeadStagesRetailData,
    {
      onSuccess: (data) => {
        setMyData(data);
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
      maxHeight={595}
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
