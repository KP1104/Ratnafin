import { LOSSDK, DOCCRUDTYPE } from "registry/fns/los";
import { documentType } from "../docUpload/metadata";
import {
  partnerEdit,
  partnerGrid,
  partnerUpload,
} from "./partnerDocumentsMetadata";

export const uploadDocuments = ({
  moduleType,
  productType,
  docCategory,
  categoryCD,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (
  data: FormData,
  progressHandler: any = () => {},
  completeHandler: any = () => {}
) => {
  if (!LOSSDK.isAPIInitialized()) {
    return {
      status: "failure",
      data: "Invalid token or API not initialized",
    };
  }
  const newURL = new URL(
    Boolean(productType)
      ? `./${productType}/document/${docCategory}/data/post`
      : `./document/${docCategory}/data/post`,
    LOSSDK.getBaseURL() as URL
  ).href;
  let xhr = new XMLHttpRequest();
  data.append("categoryCD", categoryCD ?? "");
  data.append("refID", refID);
  data.append("serialNo", serialNo ?? "");
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
  xhr.send(data);
};

export const listDocuments = ({
  moduleType,
  productType,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (docCategory) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${productType}/document/${docCategory}/data/get`
      : `./document/${docCategory}/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
        },
      }),
    }
  );
  if (status === "success") {
    return data?.request_data;
  } else {
    throw data?.error_data;
  }
};

export const deleteDocuments = ({
  moduleType,
  productType,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (docCategory: any, docUUID: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${productType}/document/${docCategory}/data/delete`
      : `./document/${docCategory}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
          docUUID: docUUID,
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

export const updateDocuments = ({
  moduleType,
  productType,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (docCategory: any, updateData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${productType}/document/${docCategory}/data/put`
      : `./document/${docCategory}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
          details: updateData,
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

export const verifyDocuments = ({
  moduleType,
  productType,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (
  docCategory: any,
  docUUID: any,
  remarks: any,
  docStatus: "Verify" | "Rejected"
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${productType}/document/${docCategory}/data/verification`
      : `./document/${docCategory}/data/verification`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
          docUUID: docUUID,
          remarks: remarks,
          status:
            docStatus === "Verify" ? "Y" : docStatus === "Rejected" ? "R" : "X",
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

export const generateDocumentDownloadURL = ({ moduleType, productType }) => (
  docCategory,
  docUUID
) => {
  if (!Array.isArray(docUUID)) {
    docUUID = [docUUID];
  }
  let docs = docUUID.join(",");
  return new URL(
    Boolean(productType)
      ? `./${productType}/document/${docCategory}/data/download?docUUID=${docs}&tokenID=${LOSSDK.getToken()}`
      : `./document/${docCategory}/data/download?docUUID=${docs}&tokenID=${LOSSDK.getToken()}`,
    LOSSDK.getBaseURL() as URL
  ).href;
};

export const previewDocument = ({ moduleType, productType }) => async (
  docCategory,
  docUUID
) => {
  if (!Array.isArray(docUUID)) {
    docUUID = [docUUID];
  }
  const url = new URL(
    Boolean(productType)
      ? `./${productType}/document/${docCategory}/data/preview`
      : `./document/${docCategory}/data/preview`,
    LOSSDK.getBaseURL() as URL
  ).href;
  try {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        request_data: {
          docUUID: docUUID,
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

export const getDocumentCRUDTabsMetadata = async () => {
  return documentType;
};

export const getDocumentMetaData = ({
  moduleType,
  productType,
  metaDataType,
}) => async () => {
  if (metaDataType === "grid") {
    return partnerGrid;
  } else if (metaDataType === "upload") {
    return partnerUpload;
  } else if (metaDataType === "edit") {
    return partnerEdit;
  } else {
    throw { error_msg: "Invalid MetaData Type requested" };
  }
};
