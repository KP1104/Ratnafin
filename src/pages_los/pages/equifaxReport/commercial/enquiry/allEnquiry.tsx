import { EnquirySummary } from "./enquirySummary";
import { EnquiryDetails } from "./enquiryDetails";
import { EnquiryInputDetails } from "./enquiryInputDetails";
import { HitAndNonHitSummary } from "./hitNonHitSummary";

export const AllEnquiryType = () => {
  return (
    <div className="entity-details-borrower-sec">
      <EnquirySummary />
      <EnquiryDetails />
      <EnquiryInputDetails />
      <HitAndNonHitSummary />
    </div>
  );
};
