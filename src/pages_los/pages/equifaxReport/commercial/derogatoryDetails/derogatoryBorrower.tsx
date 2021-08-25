export const DerogatoryBorrower = () => {
  return (
    <>
      <p style={{ textAlign: "right" }}>*Based on last 48 months data.</p>
      <h2>
        <strong>5.1</strong> As Borrower
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>

      <table className="table borrower-table-sec">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Derogatory Status-&gt;</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Sanctioned Amount
            </th>
            <th scope="col">Wilful Defaults</th>
            <th scope="col">Suit Filed</th>
            <th scope="col">Write-offs + Settled</th>
            <th scope="col">Invoked/Devolved</th>
            <th scope="col">Dishonored Cheque</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pvt Bank-1</td>
            <td>22,73,000</td>
            <td>N</td>
            <td>N</td>
            <td>Y</td>
            <td>N</td>
            <td>N</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
