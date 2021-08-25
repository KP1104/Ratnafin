export const DelinquencyGuarantor = () => {
  return (
    <>
      <h2>
        <strong>4.2</strong>As Guarantor
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
            <th scope="col">Credit Facility Type</th>
            <th scope="col">Current Overdue Bucket</th>
            <th scope="col">Current Account Classification</th>
            <th scope="col">Most recent Delinquency Date</th>
            <th scope="col">Earliest Delinquency Date(Last 48 months)</th>
            <th scope="col">No of times Delinquent</th>
            <th scope="col">Most severe DPD/ Asset Class (last 48 Months)</th>
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
              colspan="12"
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Delinquency As Guarantor
            </td>
          </tr>
          <tr>
            <td colSpan={12}>Off Member</td>
          </tr>

          <tr>
            <td>NBFC-1</td>
            <td></td>
            <td>Others</td>
            <td>DPD-Others</td>
            <td>Others</td>
            <td>2018-01-08</td>
            <td>2017-02-28</td>
            <td>13</td>
            <td>DPD &gt; 180/Others</td>
            <td>7</td>
            <td>10,63,850</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
