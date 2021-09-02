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

export const reSendVerificationMessage = async ({
  requestType,
  transactionID,
}) => {
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

export const reInitiateVerificationAPI = async ({
  requestType,
  transactionID,
}) => {
  let currentURL: any = undefined;
  currentURL =
    requestType === "EMAIL-VERIFY"
      ? "./lead/external/otp/email/re-initiate"
      : requestType === "MOBILE-VERIFY"
      ? "./lead/external/otp/mobile/re-initiate"
      : requestType === "CREDIT"
      ? "./lead/external/equifax/request/re-initiate"
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

export const expireLink = async ({ requestType, transactionID }) => {
  let currentURL: any = undefined;
  currentURL =
    requestType === "EMAIL-VERIFY"
      ? "./lead/external/email/token/expire"
      : requestType === "MOBILE-VERIFY"
      ? "./lead/external/mobile/token/expire"
      : requestType === "CREDIT"
      ? "./lead/external/equifax/token/expire"
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
