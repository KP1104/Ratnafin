import { LOSSDK } from "registry/fns/los";

export const submitBecomePartnerData = async (formData?: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./users/become_partner",
    {
      body: JSON.stringify({
        action: "become_partner",
        request_data: { ...formData },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data?.error_data };
  }
};
