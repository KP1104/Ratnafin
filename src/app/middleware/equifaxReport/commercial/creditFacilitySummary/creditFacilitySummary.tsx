import { AllCreditFacilityDetails } from "./allCreditFacilityDetails";

export const CreditFacilitySummary = ({ creditFacilityDetails }) => {
  return (
    <article>
      <div className="entity-details-borrower-sec">
        <h2 style={{ marginBottom: "20px" }}>
          <strong>7</strong>Credit Facilities Summary
        </h2>
        <h2>
          <strong>7.1</strong>As Borrower - Credit Facility Details
        </h2>
        {creditFacilityDetails?.map((accountDetail, index) => (
          <AllCreditFacilityDetails
            creditFacilityDetails={accountDetail}
            key={index}
            count={index + 1}
          />
        ))}
      </div>
    </article>
  );
};
