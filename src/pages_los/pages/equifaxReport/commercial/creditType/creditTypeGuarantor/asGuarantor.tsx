import { GuarantorCreditSummary } from "./guarantorCreditSummary";

export const AsGuarantor = () => {
  return (
    <div className="entity-details-borrower-sec">
      <h2>
        <strong>6.2</strong>As Guarantor
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec" style={{ marginBottom: "0" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{ width: "17.7%" }}></th>
            <th scope="col" style={{ textAlign: "center", width: "40%" }}>
              On Member
            </th>
            <th scope="col" style={{ textAlign: "center", width: "40%" }}>
              Off Member
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={15} style={{ padding: "0" }}>
              <table
                className="table borrower-table-sec"
                style={{ marginBottom: "0" }}
              >
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <b style={{ fontWeight: "normal", float: "right" }}>
                        CF Group-&gt;
                      </b>
                      <br />
                      Asset Class
                    </td>
                    <td>WC</td>
                    <td>NF</td>
                    <td>TL</td>
                    <td>Fx</td>
                    <td>Other</td>
                    <td>Total</td>
                    <td>WC</td>
                    <td>NF</td>
                    <td>TL</td>
                    <td>Fx</td>
                    <td>Other</td>
                    <td>Total</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <GuarantorCreditSummary />
    </div>
  );
};
