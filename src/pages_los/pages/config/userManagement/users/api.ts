import { LOSSDK } from "registry/fns/los";

export const getUserGridData = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/role/grid/data`,
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

export const insertUserData = async (formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/role/data/post`,
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

export const getUsersData = async ({ queryKey }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/role/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          userID: queryKey[1]?.userID,
        },
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const updateUserData = async (formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/role/data/put`,
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
