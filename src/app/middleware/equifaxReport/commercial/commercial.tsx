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
import { transform } from "./transform";
import { MiddlewareSDK } from "registry/fns/middleware";
import "assets/css/bootstrap.min.css";
import "./style.css";

export const CommercialEquifaxReport = () => {
  const { tokenID } = useParams();
  const result = useQuery(["getMandateFormData", tokenID], () =>
    MiddlewareSDK.getEqifaxReportData({ tokenID })
  );

  const data = result?.data;
  let newdata = transform(data);
  const loading = result?.isLoading || result?.isFetching;
  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : (
    <>
      <EntityNameDetails
        header={newdata?.header}
        severityGrid={newdata?.severityGrid}
        creditScore={newdata?.equifaxScoresCommercial}
        overallCreditSummary={newdata?.overallCreditSummary}
        entityName={newdata?.entityName}
      />
      <EntityDetails
        entityDetails={newdata?.entityDetailsBorrower}
        openCreditFacility={newdata?.openCreditFacilitySummary}
      />
      <DelinquencyDetails delinquencyDetails={newdata?.delinquencySummary} />
      <DerogatoryDetails derogatoryDetails={newdata?.derogSummary} />
      <CreditType creditTypeSummary={newdata?.creditTypeSummary} />
      <CreditFacilitySummary
        creditFacilityDetails={newdata?.creditFacilityDetails}
      />
      <Enquiry
        enquirySummary={newdata?.enquirySummary}
        enquiriesDetails={newdata?.enquiriesDetails}
        inquiryInputDetails={newdata?.inquiryInputDetails}
        hitNonHitSummaryDetails={newdata?.CCRHitDetailsLst}
      />
      <GlossaryTermsExplanation />
    </>
  );
  return renderResult;
};
