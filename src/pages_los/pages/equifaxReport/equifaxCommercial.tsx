import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { EntityNameDetails } from "./commercial/entityNameDetails";
import { EntityDetails } from "./commercial/entityDetails";
import { DerogatoryDetails } from "./commercial/derogatoryDetails";
import { CreditTypeGuarantor } from "./commercial/creditType/creditTypeGuarantor";
import { CreditFacilitySummary } from "./commercial/creditFacilitySummary";
import { GlossaryTermsExplanation } from "./commercial/glossaryTermsExplanation";
import { MiddlewareSDK } from "registry/fns/middleware";
import { Enquiry } from "./commercial/enquiry";
import "./commercial/style.css";

const tokenID = "C3ECF0CE052775C3E05500000000000104062021012914";

export const CommercialReport = () => {
  const result = useQuery(["getMandateFormData", tokenID], () =>
    MiddlewareSDK.getEqifaxReportData({ tokenID })
  );

  const data = result?.data;
  const loading = result?.isLoading || result?.isFetching;
  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : (
    <>
      <EntityNameDetails header={data?.header} />
      <EntityDetails header={data?.header} />
      <DerogatoryDetails header={data?.header} />
      <CreditTypeGuarantor header={data?.header} />
      <CreditFacilitySummary header={data?.header} />
      <Enquiry header={data?.header} />
      <GlossaryTermsExplanation header={data?.header} />
    </>
  );
  return renderResult;
};
