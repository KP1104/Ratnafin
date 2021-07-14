import { LOSSDK } from "registry/fns/los";
import { CFTermSheetMetadata, SMETermSheetMetadata } from "./metadata";

export const getTermsheetData = async ({ refID, branchID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/termsheet/data/get`,
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

export const updateTermsheetData = () => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/termsheet/data/put`,
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
      return SMETermSheetMetadata;
    }
    case "INFRA Loans": {
      return CFTermSheetMetadata;
    }
    default: {
      return SMETermSheetMetadata;
    }
  }
};
