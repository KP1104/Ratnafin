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
      <table className="table borrower-table-sec borrower-table-sec-box">
        <tbody>
          <RelatedIndLabel />
          <tr>
            <td colSpan={12}>
              <b>On Member</b>
            </td>
          </tr>
          <RelatedIndDetails flatMap={flatMap} />
          <tr>
            <td colSpan={12}>
              <b>Off Member</b>
            </td>
          </tr>
          <RelatedIndDetails flatMap={flatMap} />
        </tbody>
      </table>
    </>
  );
};

const RelatedIndLabel = () => {
  return (
    <tr>
      <th scope="col">
        <span className="heading-color">Lender</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Name</span>
      </th>
      <th scope="col">
        <span className="heading-color">Relation Type</span>
      </th>
      <th scope="col">
        <span className="heading-color">Current Overdue Bucket</span>
      </th>
      <th scope="col">
        <span className="heading-color">Current Account Classification</span>
      </th>
      <th scope="col">
        <span className="heading-color">Most recent Delinquency Date</span>
      </th>
      <th scope="col">
        <span className="heading-color">
          Earliest Delinquency Date (Last 48 months)
        </span>
      </th>
      <th scope="col">
        <span className="heading-color">No of times Delinquent</span>
      </th>
      <th scope="col">
        <span className="heading-color">
          Most severe DPD/Asset Class (last 48 Months)
        </span>
      </th>
      <th scope="col">
        <span className="heading-color">
          Max Consecutive Overdue Period (In months)
        </span>
      </th>
      <th scope="col">
        <span className="heading-color">
          Highest Overdue Amount (In last 48 months)
        </span>
      </th>
      <th scope="col">
        <span className="heading-color">Current Overdue Amount</span>
      </th>
    </tr>
  );
};

const RelatedIndDetails = ({ flatMap }) => {
  return (
    <>
      {Array.isArray(flatMap) && flatMap.length > 0 ? (
        flatMap?.map((data) => (
          <tr>
            <td>{data?.source.split("Off-Member ")}</td>
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
          </tr>
        ))
      ) : (
        <td colSpan={12}>Data not available</td>
      )}
    </>
  );
};
