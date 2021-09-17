import { EnquirySummary } from "./enquirySummary";
import { EnquiryDetails } from "./enquiryDetails";
import { EnquiryInputDetails } from "./enquiryInputDetails";
import { HitAndNonHitSummary } from "../hitNonHitSummary/hitNotHitSummary";

export const AllEnquiryType = ({
  enquirySummary,
  enquiriesDetails,
  inquiryInputDetails,
  hitNonHitSummaryDetails,
}) => {
  return (
    <div className="entity-details-borrower-sec">
      <EnquirySummary enquirySummaryDetails={enquirySummary} />
      <EnquiryDetails enquiriesDetails={enquiriesDetails} />
      <EnquiryInputDetails enquiryInputDetails={inquiryInputDetails} />
      <HitAndNonHitSummary hitNonHitSummaryDetails={hitNonHitSummaryDetails} />
    </div>
  );
};
