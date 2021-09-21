import { EnquirySummary } from "./enquirySummary";
import { Enquiries } from "./enquiries";
import { InputEnquiry } from "./inputEnquiry";

export const EnquiryInfo = ({ enquirySummaryInfo, enquiryInputInfo }) => {
  return (
    <>
      <article>
        <EnquirySummary enquirySummaryDetails={enquirySummaryInfo} />
        <hr />
        <Enquiries enquiriesDetails={enquirySummaryInfo?.enquiries} />
        <hr />
      </article>
      <InputInquiryDetails inputEnquiryDetails={enquiryInputInfo} />
    </>
  );
};

const InputInquiryDetails = ({ inputEnquiryDetails }) => {
  return (
    <article>
      <InputEnquiry inputEnquiryDetails={inputEnquiryDetails} />
    </article>
  );
};
