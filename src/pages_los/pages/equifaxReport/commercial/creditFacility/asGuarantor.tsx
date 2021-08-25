export const GuarantorCreditFacility = () => {
  return (
    <>
      <h2>
        <strong>3.2</strong> As Guarantor
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Lender</th>
            <th scope="col" style={{ textAlign: "center" }}>
              OPen CF#
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NBFC</td>
            <td></td>
            <td></td>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
