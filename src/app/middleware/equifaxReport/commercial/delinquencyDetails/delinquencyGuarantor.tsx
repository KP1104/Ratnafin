export const DelinquencyGuarantor = ({ guarantorDelinquency = {} }: any) => {
  const asGuarantor = guarantorDelinquency;
  const allGuarantorsType = Object.keys(asGuarantor);
  const flatMapGuarantor: any = [];
  for (let i = 0; i < allGuarantorsType.length; i++) {
    for (const one of asGuarantor[allGuarantorsType[i]]) {
      flatMapGuarantor.push({ ...one, source: allGuarantorsType[i] });
    }
  }
  return (
    <>
      <h2>
        <strong>4.2</strong>As Guarantor
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec borrower-table-sec-box">
        <tbody>
          <GuarantorLabel />
          <tr>
            <td colSpan={12}>
              <b>On Member</b>
            </td>
          </tr>
          <GuranatorDetails flatMapGuarantor={flatMapGuarantor} />
          <tr>
            <td colSpan={12}>
              <b>Off Member</b>
            </td>
          </tr>
          <GuranatorDetails flatMapGuarantor={flatMapGuarantor} />
        </tbody>
      </table>
    </>
  );
};

const GuarantorLabel = () => {
  return (
    <tr>
      <th scope="col">
        <span className="heading-color">Lender</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Name</span>
      </th>
      <th scope="col">
        <span className="heading-color">Credit Facility Type</span>
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
          Earliest Delinquency Date(Last 48 months)
        </span>
      </th>
      <th scope="col">
        <span className="heading-color">No of times Delinquent</span>
      </th>
      <th scope="col">
        <span className="heading-color">
          Most severe DPD/ Asset Class (last 48 Months)
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

const GuranatorDetails = ({ flatMapGuarantor }) => {
  return (
    <>
      {Array.isArray(flatMapGuarantor) && flatMapGuarantor.length > 0 ? (
        flatMapGuarantor.map((guarantrDetail) => (
          <tr>
            <td>{guarantrDetail?.source}</td>
            <td>{guarantrDetail?.name}</td>
            <td>{guarantrDetail?.CF_Type}</td>
            <td>{guarantrDetail?.CurrentOverdueBucket}</td>
            <td>{guarantrDetail?.CurrentAccountClassification}</td>
            <td>{guarantrDetail?.MostRecentDelinquencyDate}</td>
            <td>{guarantrDetail?.EarliestDelinquencyDate_Lst_48_Mths}</td>
            <td>{guarantrDetail?.Delinquent_Count}</td>
            <td>{guarantrDetail?.MostSevere_DPD_AssetClass_Lst_48_Mths}</td>
            <td>{guarantrDetail?.MaxConsecutive_OverduePeriod_In_Mths}</td>
            <td>{guarantrDetail?.HighestOverdue_Amt_Lst_48_Mths}</td>
            <td>{guarantrDetail?.CurrentOverdue_Amt}</td>
          </tr>
        ))
      ) : (
        <td colSpan={12}>No data found</td>
      )}
    </>
  );
};
