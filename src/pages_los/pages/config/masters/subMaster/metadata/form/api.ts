import { LOSSDK } from "registry/fns/los";

export const getRegion = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/options/region`,
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      let options = data?.response_data.map((one) => ({
        label: one?.regionName,
        value: one?.regionCode,
      }));
      return options;
    }
    return [];
  } else {
    throw data?.error_data;
  }
};

export const getZone = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/options/zone`,
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      let options = data?.response_data.map((one) => ({
        label: one?.zoneName,
        value: one?.zoneCode,
      }));
      return options;
    }
    return [];
  } else {
    throw data?.error_data;
  }
};

export const getCountry = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/options/country`,
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      let options = data?.response_data.map((one) => ({
        label: one?.countryName,
        value: one?.countryCode,
      }));
      return options;
    }
    return [];
  } else {
    throw data?.error_data;
  }
};
