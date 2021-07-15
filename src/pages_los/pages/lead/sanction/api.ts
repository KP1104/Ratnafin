import { LOSSDK } from "registry/fns/los";
import { CFSanctionMetadata, SMESanctionMetadata } from "./metadata";

export const getSanctionData = ({ refID, moduleType }) => async (branchID) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/sanction/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          branchID: branchID,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const updateSanctionData = ({ refID, moduleType }) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/sanction/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          ...formData,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getMetadata = () => async (category) => {
  switch (category) {
    case "SME Loans": {
      return SMESanctionMetadata;
    }
    case "INFRA Loans": {
      return CFSanctionMetadata;
    }
    default: {
      return SMESanctionMetadata;
    }
  }
};
