import { LOSSDK } from "registry/fns/los";

export const assignMembers =
  ({ moduleType, assignmentType, refID }) =>
  async (formData) => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./${moduleType}/assign/data/put`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
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

export const getCurrentAssignment =
  ({ assignmentType, moduleType, refID }) =>
  async () => {
    const { data, status } = await LOSSDK.internalFetcher(
      `./${moduleType}/assign/${assignmentType}/data/get`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
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

export const getRoleListForAssignment = async (
  _,
  { refID, assignmentType, moduleType }
) => {
  const { status, data } = await LOSSDK.internalFetcher(
    `./${moduleType}/assign/${assignmentType}/options/role`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID ?? " ",
        },
      }),
    }
  );
  if (status === "success" && Array.isArray(data?.response_data)) {
    const newArray = data.response_data.map((one) => ({
      value: one?.roleCode,
      label: one?.roleName,
    }));
    return newArray;
  } else {
    throw data?.error_data;
  }
};

export const getTeamRoleListForAssignment = async (
  _,
  { refID, assignmentType, moduleType },
  dependentFields2
) => {
  const { status, data } = await LOSSDK.internalFetcher(
    `./${moduleType}/assign/${assignmentType}/options/team `,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID ?? " ",
          teamRole:
            dependentFields2["usersAssignDetails.teamRole"].value ?? " ",
        },
      }),
    }
  );
  if (status === "success" && Array.isArray(data?.response_data)) {
    const newArray = data.response_data.map((one) => ({
      value: one?.userID,
      label: one?.username,
    }));
    return newArray;
  } else {
    throw data?.error_data;
  }
};
