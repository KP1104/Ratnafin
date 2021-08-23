import { LOSSDK } from "registry/fns/los";

export const getLeadStagesSMECFData = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./reports/lead_stage_sme_cf",
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getLeadStagesRetailData = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./reports/lead_stage_retail",
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getInquiryLeadDetails = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./reports/inquiry_lead_details",
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};
