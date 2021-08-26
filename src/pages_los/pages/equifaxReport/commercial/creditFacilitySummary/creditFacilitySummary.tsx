import { Header } from "../header";
import { AllCreditFacilityDetails } from "./allCreditFacilityDetails";

export const CreditFacilitySummary = ({ header }) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <AllCreditFacilityDetails />
    </article>
  );
};
