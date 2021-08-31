import { LOSSDK } from "registry/fns/los";

export const getVerificationAPIGridStatusData = async ({ refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/healthcheck/grid/data`,
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

export const initiateVerificationAPI = ({ refID }) => async (formData) => {
  const { apiType, ...others } = formData;
  let currentURL: any = undefined;
  currentURL =
    apiType === "email"
      ? "./lead/external/otp/email/initiate"
      : apiType === "mobile"
      ? "./lead/external/otp/mobile/initiate"
      : apiType === "credit-score"
      ? "./lead/external/equifax/request/initiate"
      : undefined;
  if (currentURL === undefined) {
    /*eslint-disable no-throw-literal*/
    throw { error_msg: "Invalid API Type" };
  }
  const { data, status } = await LOSSDK.internalFetcher(currentURL, {
    body: JSON.stringify({
      request_data: {
        ...others,
        serialNo: others?.management ?? "1",
        refID: refID,
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

export const generateDocumentDownloadURL = (moduleType, docUUID) => {
  return new URL(
    `./${moduleType}/external/equifaxreport/data/download?docUUID=${docUUID}&tokenID=${LOSSDK.getToken()}`,
    LOSSDK.getBaseURL() as URL
  ).href;
};

export const reSendMessage = async (requestType, transactionID) => {
  let currentURL: any = undefined;
  currentURL =
    requestType === "CREDIT"
      ? "./lead/external/equifax-consent/link/resend"
      : requestType === "MOBILE-VERIFY"
      ? "./lead/external/mobile-verification/link/resend"
      : requestType === "EMAIL-VERIFY"
      ? "./lead/external/email-verification/link/resend"
      : undefined;
  if (currentURL === undefined) {
    throw { error_msg: "Invalid API Type" };
  }
  const { data, status } = await LOSSDK.internalFetcher(currentURL, {
    body: JSON.stringify({
      request_data: {
        transactionID: transactionID,
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
