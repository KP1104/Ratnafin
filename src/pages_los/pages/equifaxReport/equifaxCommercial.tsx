import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { useParams } from "react-router-dom";
import { EntityNameDetails } from "./commercial/entityName";
import { EntityDetails } from "./commercial/entityDetails";
import { DerogatoryDetails } from "./commercial/derogatoryDetails";
import { CreditFacilitySummary } from "./commercial/creditFacilitySummary";
import { GlossaryTermsExplanation } from "./commercial/glossaryTermsExplanation";
import { MiddlewareSDK } from "registry/fns/middleware";
import { Enquiry } from "./commercial/enquiries";
import "./commercial/style.css";

export const CommercialReport = () => {
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
        header={data?.header}
        severityGrid={data?.severityGrid}
        creditScore={data?.equifaxScoresCommercial}
        overallCreditSummary={data?.overallCreditSummary}
        entityName={data?.entityName}
      />
      <EntityDetails
        header={data?.header}
        entityDetails={data?.entityDetailsBorrower}
        openCreditFacility={data?.openCreditFacilitySummary}
        delinquencySummary={data?.delinquencySummary}
      />
      <DerogatoryDetails
        header={data?.header}
        derogatorDetails={data?.derogSummary}
        creditTypeSummary={data?.creditTypeSummary}
      />
      <CreditFacilitySummary
        header={data?.header}
        creditFacilityDetails={data?.creditFacilityDetails}
      />
      <Enquiry
        header={data?.header}
        enquirySummary={data?.enquirySummary}
        enquiriesDetails={data?.enquiriesDetails}
        inquiryInputDetails={data?.inquiryInputDetails}
      />
      <GlossaryTermsExplanation header={data?.header} />
    </>
  );
  return renderResult;
};
