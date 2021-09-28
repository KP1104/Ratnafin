import { LOSSDK } from "registry/fns/los";

export const getUserAssignedBranchesData = async ({ queryKey }) => {
  let userID = queryKey[1]?.userID;
  const { data, status } = await LOSSDK.internalFetcher(
    "./users/employee/team-branch/grid/data",
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
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
