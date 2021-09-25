import * as inquiryMeta from "pages_los/metaData/inquiry";
import { extractMetaData } from "pages_los/metaData/utils/deriveData";

export const getFormMetaData =
  ({ productID }) =>
  async (metadataType: any) => {
    let mode = metadataType;
    if (["edit", "new", "view"].indexOf(metadataType) >= 0) {
      switch (productID) {
        case "12300001":
          return extractMetaData(inquiryMeta.retail_12300001, mode);
        case "12300002":
          return extractMetaData(inquiryMeta.retail_12300002, mode);
        case "12300003":
          return extractMetaData(inquiryMeta.retail_12300003, mode);
        case "12300004":
          return extractMetaData(inquiryMeta.retail_12300004, mode);
        case "12300005":
          return extractMetaData(inquiryMeta.sme_12300005, mode);
        case "12300006":
          return extractMetaData(inquiryMeta.sme_12300006, mode);
        case "12300007":
          return extractMetaData(inquiryMeta.sme_12300007, mode);
        case "12300008":
          return extractMetaData(inquiryMeta.sme_12300008, mode);
        case "12300009":
          return extractMetaData(inquiryMeta.sme_12300009, mode);
        case "123000010":
          return extractMetaData(inquiryMeta.sme_123000010, mode);
        case "123000011":
          return extractMetaData(inquiryMeta.infra_123000011, mode);
        case "123000012":
          return extractMetaData(inquiryMeta.infra_123000012, mode);
        case "123000013":
          return extractMetaData(inquiryMeta.unsecure_123000013, mode);
        case "123000014":
          return extractMetaData(inquiryMeta.unsecure_123000014, mode);
        default:
          throw { error_msg: "Not a valid product" };
      }
    } else {
      throw { error_msg: "Invalid form mode" + mode };
    }
  };
