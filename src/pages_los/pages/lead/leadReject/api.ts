import { LOSSDK } from "registry/fns/los";

export const rejectLead = async ({ leadNo, remarks }: any) => {
  const { data, status } = await LOSSDK.internalFetcher(`./lead/inactive`, {
    body: JSON.stringify({
      request_data: {
        refID: leadNo,
        remarks: remarks,
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};
