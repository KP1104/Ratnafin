import { Header } from "../header";
import { AllEnquiryType } from "./allEnquiry";

export const Enquiry = ({
  header,
  enquirySummary,
  enquiriesDetails,
  inquiryInputDetails,
}) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <AllEnquiryType
        enquirySummary={enquirySummary}
        enquiriesDetails={enquiriesDetails}
        inquiryInputDetails={inquiryInputDetails}
      />
    </article>
  );
};
