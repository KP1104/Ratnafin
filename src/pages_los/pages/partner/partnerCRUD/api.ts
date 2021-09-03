import { LOSSDK } from "registry/fns/los";
import { partnerGridMetaData } from "./metadata";
import { documentType } from "../docUpload/metadata";

export const submitBecomePartnerData = async (formData?: any) => {
  const { data, status } = await LOSSDK.internalFetcher("./partner/data/post", {
    body: JSON.stringify({
      request_data: { ...formData },
      channel: "W",
    }),
  });
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const updateBecomePartnerData = ({ tranCD }: any) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(`./partner/data/put`, {
    body: JSON.stringify({
      request_data: {
        refID: tranCD,
        ...formData,
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getBecomePartnerFormData = async (tranID) => {
  const { data, status } = await LOSSDK.internalFetcher("./partner/data/get", {
    body: JSON.stringify({
      request_data: { refID: tranID },
      channel: "W",
    }),
  });
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getGridMetaData = () => async () => {
  return partnerGridMetaData;
};

export const getPartnerGridData = async () => {
  const { data, status } = await LOSSDK.internalFetcher("./partner/list/get", {
    body: JSON.stringify({
      request_data: {},
      channel: "W",
    }),
  });
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getDocumentCRUDTabsMetadata = () => {
  return documentType;
};
