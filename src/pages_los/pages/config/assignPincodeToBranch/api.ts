import { LOSSDK } from "registry/fns/los";

export const getPincodeList = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/pincode/data/get`,
    {
      body: JSON.stringify({
        request_data: {},
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

export const addPincodeToAssignBranch = async (formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/pincode/data/post`,
    {
      body: JSON.stringify({
        request_data: {
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

export const deletePincode = ({ pincode }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/pincode/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          pincode: pincode,
        },
        channel: "W",
      }),
    }
  );
  console.log(data);
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};
