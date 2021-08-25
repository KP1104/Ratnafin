export const BorrowerCreditFacility = () => {
  return (
    <>
      <h2>
        <strong>3.1</strong> As Borrower
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
            <th scope="col">Address</th>
            <th scope="col">Date Of Inc.</th>
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
            <td>Other</td>
            <td>1</td>
            <td></td>
            <td>2,50,00,000</td>
            <td>71,30,121</td>
            <td>0</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>PUS Bank</td>
            <td>6</td>
            <td>6</td>
            <td>8,19,76,869</td>
            <td>3,26,32,579</td>
            <td>0</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Pvt Bank</td>
            <td>15</td>
            <td>1</td>
            <td>5,08,16,980</td>
            <td>1,44,13,369</td>
            <td>13,81,500</td>
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
