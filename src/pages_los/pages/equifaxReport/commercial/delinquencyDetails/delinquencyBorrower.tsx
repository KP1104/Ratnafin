export const DelinquencyBorrower = () => {
  return (
    <>
      <h2>
        <strong>4</strong>Delinquency Summry
      </h2>
      <p style={{ textAlign: "right" }}>*Based on last 48 months data.</p>
      <h2>
        <strong>4.1</strong>As Borrower
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Lender</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Open CF#
            </th>
            <th scope="col">Delinquent CF#</th>
            <th scope="col">Sanctioned Amount</th>
            <th scope="col">Current Balance</th>
            <th scope="col">Overdue Amount</th>
            <th scope="col">
              CF Opened in Last <br />
              12 Months#
            </th>
            <th scope="col">
              CF Opened in Last 12-48 <br />
              Months#
            </th>
            <th scope="col">
              CF Opened in Last 12-48 <br />
              Months#
            </th>
            <th scope="col">
              CF Opened in Last 12-48 <br />
              Months#
            </th>
            <th scope="col">
              CF Opened in Last 12-48 <br />
              Months#
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={11}>On Member</td>
          </tr>
          <tr>
            <td
              colSpan={11}
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Delinquency As Borrower
            </td>
          </tr>
          <tr>
            <td colSpan={11}>Off Member</td>
          </tr>

          <tr>
            <td>Other</td>
            <td>Other</td>
            <td>DPD-Others</td>
            <td>Other</td>
            <td>2017-01-31</td>
            <td>2017-01-31</td>
            <td>1</td>
            <td>DPD-Others/SUB</td>
            <td>1</td>
            <td></td>
            <td>0</td>
          </tr>

          <tr>
            <td>PSU Bank-1</td>
            <td>Other</td>
            <td>DPD-Others</td>
            <td>Other</td>
            <td>2019-02-28</td>
            <td>2017-09-30</td>
            <td>18</td>
            <td>DPD-Others/LOS</td>
            <td>18</td>
            <td>38,48,504</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
