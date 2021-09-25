import { LOSSDK } from "registry/fns/los";
import {
  countryMasterEditViewMetadata,
  regionMasterEditViewMetadata,
  zoneMasterEditViewMetadata,
  countryMasterMetadata,
  regionMasterMetadata,
  zoneMasterMetadata,
} from "../metadata";

export const insertMastersData =
  ({ moduleType }: any) =>
  async (formData: any) => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/detail/data/post`,
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

export const getMastersFormData =
  ({ moduleType }: any) =>
  async () => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/detail/data/get`,
      {
        body: JSON.stringify({
          request_data: {},
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

export const getMastersGridData = async ({ moduleType }: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./config/${moduleType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {},
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

export const updateMastersData =
  ({ moduleType }: any) =>
  async (formData: any) => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/detail/data/get`,
      {
        body: JSON.stringify({
          request_data: { ...formData },
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

export const getMasterFormMetadata = async ({ moduleType, type }: any) => {
  switch (moduleType) {
    case "region":
      if (type === "edit") {
        return regionMasterEditViewMetadata;
      }
      return regionMasterMetadata;
    case "zone":
      if (type === "edit") {
        return zoneMasterEditViewMetadata;
      }
      return zoneMasterMetadata;
    case "country":
      if (type === "edit") {
        return countryMasterEditViewMetadata;
      }
      return countryMasterMetadata;
    default:
      throw { error_msg: "Invalid Data" };
  }
};
