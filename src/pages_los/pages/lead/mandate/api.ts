import { LOSSDK } from "registry/fns/los";

export const updateMandate = ({ moduleType, productType, refID }) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/put`,
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

export const getMandateFormData = ({
  moduleType,
  productType,
  refID,
}) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/get`,
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
    return { data: data?.response_data, tranCD: data?.response_data?.tranCD };
  } else {
    throw data?.error_data;
  }
};

export const generateDocumentDownloadURL = (tranCD) => {
  return new URL(
    `http://10.55.6.61:8081/los/lead/document/mandate/download?accessToken=${LOSSDK.getToken()}&docID=${tranCD}`,
    LOSSDK.getBaseURL() as URL
  ).href;
};
