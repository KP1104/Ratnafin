import { LOSSDK } from "registry/fns/los";

export const onFileUpload = ({ tranCD }) => async (
  file,
  progressHandler: any = () => {},
  completeHandler: any = () => {}
) => {
  const newURL = new URL(
    `./lead/document/termsheet/upload`,
    LOSSDK.getBaseURL() as URL
  ).href;

  let xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", tranCD);
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

export const previewDocument = async ({ tranCD }: any) => {
  const url = new URL(
    `./lead/document/termsheet/preview`,
    LOSSDK.getBaseURL() as URL
  ).href;
  try {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        request_data: {
          tranCD: tranCD,
        },
      }),
      headers: new Headers({
        Authorization: `Bearer ${LOSSDK.getToken()}`,
        "Content-Type": "application/json",
      }),
    });
    if (String(response.status) === "200") {
      let data = await response.blob();
      return data;
    } else {
      return new Error("Error getting file");
    }
  } catch (e) {
    return e;
  }
};

export const documentIfExist = async ({ tranCD }: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/termsheet/check/file`,
    {
      body: JSON.stringify({
        request_data: {
          tranCD: tranCD,
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
