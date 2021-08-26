import { Header } from "../header";
import { AllEnquiryType } from "./allEnquiry";

export const Enquiry = ({ header }) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <AllEnquiryType />
    </article>
  );
};
