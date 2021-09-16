import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { useParams } from "react-router-dom";
import { EntityNameDetails } from "./entityName";
import { EntityDetails } from "./entityDetails";
import { DerogatoryDetails } from "./derogatoryDetails";
import { CreditFacilitySummary } from "./creditFacilitySummary";
import { GlossaryTermsExplanation } from "./glossaryTermsExplanation";
import { Enquiry } from "./enquiries";
import { DelinquencyDetails } from "./delinquencyDetails";
import { CreditType } from "./creditType";
import { MiddlewareSDK } from "registry/fns/middleware";
import "assets/css/bootstrap.min.css";
import "./style.css";

export const CommercialEquifaxReport = () => {
  const { tokenID } = useParams();
  const result = useQuery(["getMandateFormData", tokenID], () =>
    MiddlewareSDK.getEqifaxReportData({ tokenID })
  );

  const data = result?.data;
  const loading = result?.isLoading || result?.isFetching;
  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : (
    <>
      <EntityNameDetails
        severityGrid={data?.severityGrid}
        creditScore={data?.equifaxScoresCommercial}
        overallCreditSummary={data?.overallCreditSummary}
        entityName={data?.entityName}
      />
      <EntityDetails
        entityDetails={data?.entityDetailsBorrower}
        openCreditFacility={data?.openCreditFacilitySummary}
      />
      <DelinquencyDetails delinquencyDetails={data?.delinquencySummary} />
      <DerogatoryDetails derogatoryDetails={data?.derogSummary} />
      <CreditType creditTypeSummary={data?.creditTypeSummary} />
      <CreditFacilitySummary
        creditFacilityDetails={data?.creditFacilityDetails}
      />
      <Enquiry
        enquirySummary={data?.enquirySummary}
        enquiriesDetails={data?.enquiriesDetails}
        inquiryInputDetails={data?.inquiryInputDetails}
        hitNonHitSummaryDetails={data?.CCRHitDetailsLst}
      />
      <GlossaryTermsExplanation />
    </>
  );
  return renderResult;
};
