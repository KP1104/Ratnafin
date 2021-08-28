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
      <table className="table borrower-table-sec">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Lender</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Name
            </th>
            <th scope="col">Credit Facility Type</th>
            <th scope="col">Current Overdue Bucket</th>
            <th scope="col">Current Account Classification</th>
            <th scope="col">Most recent Delinquency Date</th>
            <th scope="col">Earliest Delinquency Date(Last 48 months)</th>
            <th scope="col">No of times Delinquent</th>
            <th scope="col">Most severe DPD/ Asset Class (last 48 Months)</th>
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
              colspan="12"
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Delinquency As Guarantor
            </td>
          </tr>
          <tr>
            <td colSpan={12}>Off Member</td>
          </tr>

          <tr>
            {Array.isArray(flatMapGuarantor)
              ? flatMapGuarantor.map((guarantrDetail) => (
                  <>
                    <td>{guarantrDetail?.source}</td>
                    <td>{guarantrDetail?.name}</td>
                    <td>{guarantrDetail?.CF_Type}</td>
                    <td>{guarantrDetail?.CurrentOverdueBucket}</td>
                    <td>{guarantrDetail?.CurrentAccountClassification}</td>
                    <td>{guarantrDetail?.MostRecentDelinquencyDate}</td>
                    <td>
                      {guarantrDetail?.EarliestDelinquencyDate_Lst_48_Mths}
                    </td>
                    <td>{guarantrDetail?.Delinquent_Count}</td>
                    <td>
                      {guarantrDetail?.MostSevere_DPD_AssetClass_Lst_48_Mths}
                    </td>
                    <td>
                      {guarantrDetail?.MaxConsecutive_OverduePeriod_In_Mths}
                    </td>
                    <td>{guarantrDetail?.HighestOverdue_Amt_Lst_48_Mths}</td>
                    <td>{guarantrDetail?.CurrentOverdue_Amt}</td>
                  </>
                ))
              : null}
          </tr>
        </tbody>
      </table>
    </>
  );
};
