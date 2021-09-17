import { AccountDetails } from "./accountDetails";
import { GuarantorIndividual } from "./guarantorsIndividuals";
import { GuarantorEntities } from "./guarantorsEntities";

export const AllCreditFacilityDetails = ({ creditFacilityDetails, count }) => {
  return (
    <div className="entity-details-borrower-sec">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col" colSpan={15}>
              7.1.{count} Credit Facility Details
            </th>
          </tr>
        </thead>
        <tbody>
          <AccountDetails accountDetails={creditFacilityDetails} />
        </tbody>
      </table>
      <GuarantorIndividual count={count} />
      <GuarantorEntities count={count} />
    </div>
  );
};
