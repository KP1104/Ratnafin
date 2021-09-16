export const GuarantorRelatedInd = ({ relatedIndDerogatory }) => {
  const flatMapRelatedInd: any = [];
  if (Boolean(relatedIndDerogatory)) {
    const allBorrowersType = Object.keys(relatedIndDerogatory);
    for (let i = 0; i < allBorrowersType.length; i++) {
      for (const one of relatedIndDerogatory[allBorrowersType[i]]) {
        flatMapRelatedInd.push({ ...one, source: allBorrowersType[i] });
      }
    }
  }
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
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">Derogatory Status-&gt;</span>
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              <span className="heading-color">Name</span>
            </th>
            <th scope="col">
              <span className="heading-color">Reletion Type</span>
            </th>
            <th scope="col">
              <span className="heading-color">Sanctioned Amount</span>
            </th>
            <th scope="col">
              <span className="heading-color">Willful Defaults</span>
            </th>
            <th scope="col">
              <span className="heading-color">Suit filed</span>
            </th>
            <th scope="col">
              <span className="heading-color">Write-offs + Settled</span>
            </th>
            <th scope="col">
              <span className="heading-color">Invoked/Devolved</span>
            </th>
            <th scope="col">
              <span className="heading-color">Dishonored Cheque</span>
            </th>
          </tr>
          {Array.isArray(flatMapRelatedInd) && Boolean(flatMapRelatedInd) ? (
            flatMapRelatedInd.map((value) => (
              <tr>
                <td>{value.Name}</td>
                <td>{value.Relationship_Type}</td>
                <td>{value.Sanctioned_Amt}</td>
                <td>{value.WilfulDefaults_Instance}</td>
                <td>{value.Suitfiled_Instance}</td>
                <td>{value.WriteOffs_Settled_Instance}</td>
                <td>{value.Invoked_Devolved_Instance}</td>
                <td>{value.DishonoredCheque_Instance}</td>
              </tr>
            ))
          ) : (
            <td colSpan={12}>
              No Guarantor(s) and Related Individual(s)/Non-individual(s)
              Details
            </td>
          )}
        </tbody>
      </table>
    </>
  );
};
