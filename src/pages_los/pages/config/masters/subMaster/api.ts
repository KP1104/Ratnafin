import { LOSSDK, crudType } from "registry/fns/los";
import {
  countryZoneMasterMetadata,
  zonesRegionMasterMetadata,
  regionBranchMasterMetadata,
} from "./metadata/form";
import {
  countryZoneMasterGridMetaData,
  zoneRegionMasterGridMetaData,
  regionBranchMasterGridMetaData,
} from "./metadata/grid";

export const insertBranchData =
  ({ moduleType, refID }: crudType) =>
  async (formData: any) => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/data/post`,
      {
        body: JSON.stringify({
          request_data: {
            code: refID,
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

export const getFormData =
  ({ moduleType, refID }: crudType) =>
  async () => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/data/get`,
      {
        body: JSON.stringify({
          request_data: { code: refID },
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

export const getGridData =
  ({ moduleType, refID }: crudType) =>
  async () => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/grid/data`,
      {
        body: JSON.stringify({
          request_data: {
            code: refID,
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

export const updateBranchData =
  ({ moduleType, refID }: crudType) =>
  async (formData: any) => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/data/put`,
      {
        body: JSON.stringify({
          request_data: {
            code: refID,
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

export const deleteBranchData =
  ({ moduleType, refID }: crudType) =>
  async () => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./config/${moduleType}/data/delete`,
      {
        body: JSON.stringify({
          request_data: {
            code: refID,
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

export const getFormMetaData =
  ({ moduleType, refID }: crudType) =>
  async () => {
    switch (moduleType) {
      case "country-zone":
        return countryZoneMasterMetadata;
      case "region-branch":
        return regionBranchMasterMetadata;
      case "zone-region":
        return zonesRegionMasterMetadata;
      default:
        throw { error_msg: "Invalid Data" };
    }
  };

export const getGridMetaData =
  ({ moduleType, refID }: crudType) =>
  async () => {
    switch (moduleType) {
      case "country-zone":
        return countryZoneMasterGridMetaData;
      case "region-branch":
        return regionBranchMasterGridMetaData;
      case "zone-region":
        return zoneRegionMasterGridMetaData;
      default:
        throw { error_msg: "Invalid Data" };
    }
  };
