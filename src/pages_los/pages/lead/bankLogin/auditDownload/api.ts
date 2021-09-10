import { LOSSDK } from "registry/fns/los";

export const getBankLoginAuditData = async ({ moduleType, refID }: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/banklogin/auditlog`,
    {
      body: JSON.stringify({
        request_data: { refID: refID },
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};
