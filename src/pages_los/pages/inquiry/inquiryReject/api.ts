import { CRMSDK } from "registry/fns/crm";

export const rejectInquiry = async ({ inquiryNo, remarks }) => {
  const { data, status } = await CRMSDK.internalFetcher(`./inquiry/inactive`, {
    body: JSON.stringify({
      request_data: {
        refID: inquiryNo,
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
