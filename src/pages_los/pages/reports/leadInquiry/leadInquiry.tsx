import { useState } from "react";
import { useQuery } from "react-query";
import Report from "components/report";
import { columns } from "./metadata";

import { getInquiryLeadDetails } from "../api";

export const LeadInquiry = () => {
  const [myData, setMyData] = useState([]);
  const query = useQuery<any, any>(
    "getInquiryLeadDetails",
    getInquiryLeadDetails,
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
      title="Lead Inquiry Details"
      options={{
        disableGroupBy: true,
      }}
      loading={query.isLoading}
      hideFooter={true}
    />
  );
};
