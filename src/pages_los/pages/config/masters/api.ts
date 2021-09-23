import { LOSSDK, crudType } from "registry/fns/los";
import {
  countryMasterGridMetaData,
  regionMasterGridMetaData,
  zoneMasterGridMetaData,
} from "./metadata/grid";

export const insertMastersData = () => {};

export const getMastersFormData = () => {};

export const getMastersGridData =
  ({ moduleType }: crudType) =>
  async () => {
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

export const updateMastersData = () => {};

export const deleteMastersData = () => {};

export const getMastersFormMetaData = () => async (metadataType: any) => {
  switch (metadataType) {
    default:
      throw { error_msg: "Invalid Module type" };
  }
};

export const getMastersGridMetaData =
  ({ moduleType }) =>
  async () => {
    switch (moduleType) {
      case "country":
        return countryMasterGridMetaData;
      case "region":
        return regionMasterGridMetaData;
      case "zone":
        return zoneMasterGridMetaData;
      default:
        throw { error_msg: "Invalid Module type" };
    }
  };
