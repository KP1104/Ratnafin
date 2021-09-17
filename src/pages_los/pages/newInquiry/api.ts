import { LOSSDK } from "registry/fns/los";
import {
  NewRetail,
  NewInfra,
  NewSME,
  NewUnsecure,
} from "pages_los/metaData/inquiry";

export const getInquiryQuestionMetaData = (productID): any => {
  switch (productID) {
    case "12300001":
      return NewRetail.retail_12300001;
    case "12300002":
      return NewRetail.retail_12300002;
    case "12300003":
      return NewRetail.retail_12300003;
    case "12300004":
      return NewRetail.retail_12300004;
    case "12300005":
      return NewSME.sme_12300005;
    case "12300006":
      return NewSME.sme_12300006;
    case "12300007":
      return NewSME.sme_12300007;
    case "12300008":
      return NewSME.sme_12300008;
    case "12300009":
      return NewSME.sme_12300009;
    case "123000010":
      return NewSME.sme_1230000010;
    case "123000011":
      return NewInfra.infra_123000011;
    case "123000012":
      return NewInfra.infra_123000012;
    case "123000013":
      return NewUnsecure.unsecure_123000013;
    case "123000014":
      return NewUnsecure.unsecure_123000014;
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
