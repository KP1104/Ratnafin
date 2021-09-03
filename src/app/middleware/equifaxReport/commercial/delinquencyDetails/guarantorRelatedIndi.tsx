export const GurantorRelatedIndividuals = ({ relatedIndDeliquincy = {} }) => {
  const relatedIndividual = relatedIndDeliquincy;
  const allRelatedIndividualType = Object.keys(relatedIndividual);
  const flatMap: any = [];
  for (let i = 0; i < allRelatedIndividualType.length; i++) {
    for (const one of relatedIndividual[allRelatedIndividualType[i]]) {
      flatMap.push({ ...one, source: allRelatedIndividualType[i] });
    }
  }
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
            {Array.isArray(flatMap)
              ? flatMap?.map((data) => (
                  <>
                    <td>{data?.source}</td>
                    <td>{data?.name}</td>
                    <td>{data?.relationType}</td>
                    <td>{data?.CurrentOverdueBucket}</td>
                    <td>{data?.CurrentAccountClassification}</td>
                    <td>{data?.MostRecentDelinquencyDate}</td>
                    <td>{data?.EarliestDelinquencyDate_Lst_48_Mths}</td>
                    <td>{data?.Delinquent_Count}</td>
                    <td>{data?.MostSevere_DPD_AssetClass_Lst_48_Mths}</td>
                    <td>{data?.MaxConsecutive_OverduePeriod_In_Mths}</td>
                    <td>{data?.HighestOverdue_Amt_Lst_48_Mths}</td>
                    <td>{data?.CurrentOverdue_Amt}</td>
                  </>
                ))
              : null}
          </tr>
        </tbody>
      </table>
    </>
  );
};
