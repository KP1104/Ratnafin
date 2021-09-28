import { LOSSDK } from "registry/fns/los";
import { MiscSDK } from "registry/fns/misc";
import { VERTICALHEAD_ROLES } from "pages_los/roles";

export const getRoles = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/options/role`,
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      let options = data?.response_data.map((one) => ({
        label: one?.roleName,
        value: one?.roleCode,
      }));
      return options;
    }
    return [];
  } else {
    throw data?.error_data;
  }
};

export const getUsers = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/options/new`,
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      let options = data?.response_data.map((one) => ({
        label: initCap(one?.userName),
        value: one?.userID,
      }));
      return options;
    }
    return [];
  } else {
    throw data?.error_data;
  }
};

export const getBranches = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/options/branch`,
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      let options = data?.response_data.map((one) => ({
        label: one?.branchName,
        value: one?.branchCode,
      }));
      return options;
    }
    return [];
  } else {
    throw data?.error_data;
  }
};

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

export const getCoordinator = async ({ queryKey }) => {
  let { role, base, entityType = "" } = queryKey[1];
  if (!Boolean(role) || !Boolean(base) || !Boolean(entityType)) {
    return [{ label: "Error fetching", value: "xx" }];
  }
  if (VERTICALHEAD_ROLES.indexOf(role) < 0) {
    return [{ label: "Error fetching", value: "xx" }];
  }

  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/options/coordinator`,
    {
      body: JSON.stringify({
        request_data: {
          roleCode: role,
          base: base,
          entityType: entityType.substr(0, 1).toUpperCase(),
        },
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      let options = data?.response_data.map((one) => ({
        label: one?.username,
        value: one?.userID,
      }));
      return options;
    }
    return [];
  } else {
    throw data?.error_data;
  }
};

export const getCompaniesInfo = MiscSDK.getMiscVal("COMPANY_TYPE");

export const getProducts = (company) => MiscSDK.getPrimaryPartnerProduct;

const initCap = (value) => {
  return value.toLowerCase().replace(/(?:^|\b)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};
