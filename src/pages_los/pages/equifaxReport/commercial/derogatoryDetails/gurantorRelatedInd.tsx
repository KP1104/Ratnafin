export const GuarantorRelatedInd = () => {
  return (
    <>
      <h2>
        <strong>5.3</strong>For Guarantor(s) and Related
        Individual(s)/Non-individual(s)
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Derogatory Status-&gt;</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Name
            </th>
            <th scope="col">Reletion Type</th>
            <th scope="col">Sanctionned Amount</th>
            <th scope="col">Wilful Defaults</th>
            <th scope="col">Suit filed</th>
            <th scope="col">Write-offs + Settled</th>
            <th scope="col">Invpked/Devolved</th>
            <th scope="col">Dishonored Cheque</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colspan="12"
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Derogratory for Guarantor(s) and Related
              Individual(s)/Non-indvidual(s)
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
