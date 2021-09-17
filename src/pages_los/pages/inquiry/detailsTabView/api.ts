import {
  EditInfra,
  ViewInfra,
  EditRetail,
  ViewRetail,
  EditSME,
  ViewSME,
  EditUnsecure,
  ViewUnsecure,
} from "pages_los/metaData/inquiry";

export const getFormMetaData = ({ productID }) => async (metadataType: any) => {
  if (metadataType === "edit") {
    switch (productID) {
      case "12300001":
        return EditRetail.retail_12300001;
      case "12300002":
        return EditRetail.retail_12300002;
      case "12300003":
        return EditRetail.retail_12300003;
      case "12300004":
        return EditRetail.retail_12300004;
      case "12300005":
        return EditSME.sme_12300005;
      case "12300006":
        return EditSME.sme_12300006;
      case "12300007":
        return EditSME.sme_12300007;
      case "12300008":
        return EditSME.sme_12300008;
      case "12300009":
        return EditSME.sme_12300009;
      case "123000010":
        return EditSME.sme_1230000010;
      case "123000011":
        return EditInfra.infra_123000011;
      case "123000012":
        return EditInfra.infra_123000012;
      case "123000013":
        return EditUnsecure.unsecure_123000013;
      case "123000014":
        return EditUnsecure.unsecure_123000014;
      default:
        throw { error_msg: "Not a valid product" };
    }
  } else if (metadataType === "view") {
    switch (productID) {
      case "12300001":
        return ViewRetail.retail_12300001;
      case "12300002":
        return ViewRetail.retail_12300002;
      case "12300003":
        return ViewRetail.retail_12300003;
      case "12300004":
        return ViewRetail.retail_12300004;
      case "12300005":
        return ViewSME.sme_12300005;
      case "12300006":
        return ViewSME.sme_12300006;
      case "12300007":
        return ViewSME.sme_12300007;
      case "12300008":
        return ViewSME.sme_12300008;
      case "12300009":
        return ViewSME.sme_12300009;
      case "123000010":
        return ViewSME.sme_1230000010;
      case "123000011":
        return ViewInfra.infra_123000011;
      case "123000012":
        return ViewInfra.infra_123000012;
      case "123000013":
        return ViewUnsecure.unsecure_123000013;
      case "123000014":
        return ViewUnsecure.unsecure_123000014;
      default:
        throw { error_msg: "Not a valid product" };
    }
  }
  throw { error_msg: "Invalid form mode" };
};
