import { LOSSDK } from "registry/fns/los";

export const getCampaignGridData = async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./campaign/master/grid/data/get",
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

export const addCampaignData = async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./campaign/master/data/post",
    {
      body: JSON.stringify({
        request_data: { ...formData },
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

export const getCampaignData = async (refID) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./campaign/master/data/get",
    {
      body: JSON.stringify({
        request_data: { refID: refID },
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

export const updateCampaignData = async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./campaign/master/data/put",
    {
      body: JSON.stringify({
        request_data: { ...formData },
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

export const getCampaignDetails = async (refID) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./campaign/detail/data/get",
    {
      body: JSON.stringify({
        request_data: { refID: refID },
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

export const deleteCampaign = async (refID) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./campaign/master/data/inactive",
    {
      body: JSON.stringify({
        request_data: { refID: refID },
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

export const downloadFailedCampaign = async (refID, serialNo) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./campaign/subdetail/failed-data/get",
    {
      body: JSON.stringify({
        request_data: { refID: refID, serialNo: serialNo },
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

export const downloadAllCampaign = (refID, serialNo) => {
  return new URL(
    `http://10.55.6.61:8081/los/campaign/document/csv/download?accessToken=${LOSSDK.getToken()}&docID=${refID}&param1=${serialNo}`,
    LOSSDK.getBaseURL() as URL
  ).href;
};

export const onFileUpload = async (
  data,
  refID,
  progressHandler: any = () => {},
  completeHandler: any = () => {}
) => {
  const finalData = data[0].blob;
  const newURL = new URL(
    "http://10.55.6.61:8081/los/campaign/document/csv/data/post",
    LOSSDK.getBaseURL() as URL
  ).href;

  let xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append("refID", refID);
  formData.append("metaData", finalData);
  xhr.open("POST", newURL, true);
  xhr.setRequestHeader("Authorization", `Bearer ${LOSSDK.getToken()}`);
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      var precentage = Math.round((e.loaded / e.total) * 100);
      progressHandler(precentage);
    } else {
      progressHandler(Infinity);
    }
  };
  xhr.onload = (e) => {
    try {
      const result = JSON.parse(xhr.responseText);
      if (result.status === "0") {
        completeHandler({ status: "success", data: result?.response_data });
      } else {
        completeHandler({ status: "failure", data: result?.error_data });
      }
    } catch (e) {
      completeHandler({
        status: "failure",
        data: { message: "unknown error occured" },
      });
    }
  };
  xhr.send(formData);
};
