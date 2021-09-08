import { Header } from "../header";
import { EnquirySummary } from "./enquirySummary";
import { Enquiries } from "./enquiries";
import { InputEnquiry } from "./inputEnquiry";
import { Footer } from "../footer";

export const EnquiryInfo = ({
  enquirySummaryInfo,
  enquiryInputInfo,
  header,
}) => {
  return (
    <>
      <article id="columns">
        <Header headerDetails={header} />
        <hr />
        <EnquirySummary enquirySummaryDetails={enquirySummaryInfo} />
        <hr />
        <Enquiries enquiriesDetails={enquirySummaryInfo?.enquiries} />
        <hr />
        <Footer />
      </article>
      <InputInquiryDetails
        inputEnquiryDetails={enquiryInputInfo}
        header={header}
      />
    </>
  );
};

const InputInquiryDetails = ({ inputEnquiryDetails, header }) => {
  return (
    <article id="columns">
      <Header headerDetails={header} />
      <hr />
      <InputEnquiry inputEnquiryDetails={inputEnquiryDetails} />
      <Footer />
    </article>
  );
};
