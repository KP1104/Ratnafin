import { LOSSDK } from "registry/fns/los";

export const getUserTeamData = async ({ queryKey }) => {
  let { userID, branchCode } = queryKey[1];

  const { data, status } = await LOSSDK.internalFetcher(
    "./users/employee/team/grid/data",
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
          branchCode: branchCode,
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

export const addTeamMember = async (userData, userID, branchCode) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./users/employee/team/data/post",
    {
      body: JSON.stringify({
        request_data: { ...userData, userID: userID, branchCode: branchCode },
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getRoleOptions = async (_, formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./users/employee/team/options/role",
    {
      body: JSON.stringify({
        request_data: {
          userRole: formData?.userRole,
        },
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      return data?.response_data.map((one) => ({
        label: one.roleName,
        value: one.roleCode,
      }));
    } else {
      return [];
    }
  } else {
    throw data?.error_data;
  }
};

export const getTeamMemebersOptions = async (_, formData, dependentValues) => {
  if (!Boolean(dependentValues?.teamRole?.value)) {
    return [];
  }
  const { data, status } = await LOSSDK.internalFetcher(
    "./users/employee/team/options/unregistered",
    {
      body: JSON.stringify({
        request_data: {
          userID: formData?.userID,
          branchCode: formData?.branchCode,
          teamRole: dependentValues?.teamRole?.value,
        },
      }),
    }
  );
  if (status === "success") {
    if (Array.isArray(data?.response_data)) {
      return data?.response_data.map((one) => ({
        label: one.username,
        value: one.userID,
      }));
    } else {
      return [];
    }
  } else {
    throw data?.error_data;
  }
};
