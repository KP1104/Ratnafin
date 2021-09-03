import { AccountDetails } from "./accountDetails";
import { GuarantorIndividual } from "./guarantorsIndividuals";
import { GuarantorEntities } from "./guarantorsEntities";

export const AllCreditFacilityDetails = ({ creditFacilityDetails, count }) => {
  return (
    <div className="entity-details-borrower-sec">
      <h2 style={{ marginBottom: "20px" }}>
        <strong>7</strong>Credit Facilities Summary
      </h2>
      <h2>
        <strong>7.1</strong>As Borrower - Credit Facility Details
      </h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col" colSpan={15}>
              7.1.1 Credit Facility Details
            </th>
          </tr>
        </thead>
        <tbody>
          <AccountDetails accountDetails={creditFacilityDetails} />
        </tbody>
      </table>
      <GuarantorIndividual />
      <GuarantorEntities />
    </div>
  );
};
