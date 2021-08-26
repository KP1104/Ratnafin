import { AccountDetails } from "./accountDetails";
import { GuarantorIndividual } from "./guarantorsIndividuals";
import { GuarantorEntities } from "./guarantorsEntities";
import { DishonouredChequeDetails } from "./dishonorChequeDetails";
import { SecurityCollateralDetails } from "./securityCollateralDetails";

export const AllCreditFacilityDetails = () => {
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
            <th scope="col">7.1.1 Credit Facility Details</th>

            <th style={{ padding: "0" }} scope="col">
              <table
                className="table borrower-table-sec"
                style={{ marginBottom: 0, width: "45%", float: "right" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th style={{ backgroundColor: "#2f03f3", width: "30%" }}>
                      Go to Section 4
                    </th>
                    <th style={{ backgroundColor: "#2f03f3", width: "30%" }}>
                      Go to Section 5
                    </th>
                    <th style={{ width: "30%" }}>Open</th>
                  </tr>
                </thead>
              </table>
            </th>
          </tr>
        </thead>
        <tbody>
          <AccountDetails />
        </tbody>
      </table>
      <GuarantorIndividual />
      <GuarantorEntities />
    </div>
  );
};
