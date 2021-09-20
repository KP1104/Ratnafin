import { LOSSDK } from "registry/fns/los";
import * as inquiryMeta from "pages_los/metaData/inquiry2";
import { extractMetaData } from "pages_los/metaData/utils/deriveData";

export const getInquiryQuestionMetaData = (productID): any => {
  switch (productID) {
    case "12300001":
      return extractMetaData(inquiryMeta.retail_12300001, "new");
    case "12300002":
      return extractMetaData(inquiryMeta.retail_12300002, "new");
    case "12300003":
      return extractMetaData(inquiryMeta.retail_12300003, "new");
    case "12300004":
      return extractMetaData(inquiryMeta.retail_12300004, "new");
    case "12300005":
      return extractMetaData(inquiryMeta.sme_12300005, "new");
    case "12300006":
      return extractMetaData(inquiryMeta.sme_12300006, "new");
    case "12300007":
      return extractMetaData(inquiryMeta.sme_12300007, "new");
    case "12300008":
      return extractMetaData(inquiryMeta.sme_12300008, "new");
    case "12300009":
      return extractMetaData(inquiryMeta.sme_12300009, "new");
    case "123000010":
      return extractMetaData(inquiryMeta.sme_123000010, "new");
    case "123000011":
      return extractMetaData(inquiryMeta.infra_123000011, "new");
    case "123000012":
      return extractMetaData(inquiryMeta.infra_123000012, "new");
    case "123000013":
      return extractMetaData(inquiryMeta.unsecure_123000013, "new");
    case "123000014":
      return extractMetaData(inquiryMeta.unsecure_123000014, "new");
    default:
      throw { error_msg: "Not a valid product" };
  }
};

//This is for react-query
export const submitInquiryData = async (formData?: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./inquiry/main/data/post",
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
