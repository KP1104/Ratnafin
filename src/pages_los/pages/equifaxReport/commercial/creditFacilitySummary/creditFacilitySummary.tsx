import { Header } from "../header";
import { AllCreditFacilityDetails } from "./allCreditFacilityDetails";

export const CreditFacilitySummary = ({ header, creditFacilityDetails }) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      {creditFacilityDetails?.map((accountDetail, index) => (
        <AllCreditFacilityDetails
          creditFacilityDetails={accountDetail}
          key={index}
          count={index + 1}
        />
      ))}
    </article>
  );
};
