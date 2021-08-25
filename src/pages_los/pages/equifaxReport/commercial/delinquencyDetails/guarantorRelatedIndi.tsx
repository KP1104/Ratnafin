export const GurantorRelatedIndividuals = () => {
  return (
    <>
      <h2>
        <strong>4.3</strong>Guarantor(s) and Related Individual(s) /
        Non-individual(s)
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Lender</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Name
            </th>
            <th scope="col">Relation Type</th>
            <th scope="col">Current Overdue Bucket</th>
            <th scope="col">Current Account Classification</th>
            <th scope="col">Most recent Delinquency Date</th>
            <th scope="col">Earliest Delinquency Date (Last 48 months)</th>
            <th scope="col">No of times Delinquent</th>
            <th scope="col">Most severe DPD/Asset Class (last 48 Months)</th>
            <th scope="col">Max Consecutive Overdue Period (In months)</th>
            <th scope="col">Highest Overdue Amount (In last 48 months)</th>
            <th scope="col">Current Overdue Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={12}>On Member</td>
          </tr>
          <tr>
            <td
              colSpan={12}
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Data
            </td>
          </tr>
          <tr>
            <td colSpan={12}>Off Member</td>
          </tr>
          <tr>
            <td>PSU Bank-1</td>
            <td></td>
            <td>Entity Guarantor</td>
            <td>DPD-Other</td>
            <td>Other</td>
            <td>2019-04-30</td>
            <td>2017-05-31</td>
            <td>13</td>
            <td>DPD &gt;180/Others</td>
            <td>10</td>
            <td>29,417</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
