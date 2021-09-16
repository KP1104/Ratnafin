import { AllEnquiryType } from "./allEnquiry";

export const Enquiry = ({
  enquirySummary,
  enquiriesDetails,
  inquiryInputDetails,
  hitNonHitSummaryDetails,
}) => {
  return (
    <article>
      <AllEnquiryType
        enquirySummary={enquirySummary}
        enquiriesDetails={enquiriesDetails}
        inquiryInputDetails={inquiryInputDetails}
        hitNonHitSummaryDetails={hitNonHitSummaryDetails}
      />
    </article>
  );
};
