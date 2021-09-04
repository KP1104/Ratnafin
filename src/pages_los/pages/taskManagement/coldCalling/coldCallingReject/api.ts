import { LOSSDK } from "registry/fns/los";

export const rejectColdCalling = async ({ coldCallingNo, remarks }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./cold-calling/inactive`,
    {
      body: JSON.stringify({
        request_data: {
          refID: coldCallingNo,
          remarks: remarks,
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
