export const DerogatoryGuarantor = () => {
  return (
    <>
      <h2>
        <strong>5.2</strong>As Guarantor
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
            <td>NBFC-1</td>
            <td>14,57,024</td>
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
