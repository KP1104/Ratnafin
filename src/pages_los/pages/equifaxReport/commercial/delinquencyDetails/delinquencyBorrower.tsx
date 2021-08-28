export const DelinquencyBorrower = ({ borrowerDelinquency = {} }) => {
  const asBorrower = borrowerDelinquency;
  const allBorrowersType = Object.keys(asBorrower);
  const flatMapBorrowers: any = [];
  for (let i = 0; i < allBorrowersType.length; i++) {
    for (const one of asBorrower[allBorrowersType[i]]) {
      flatMapBorrowers.push({ ...one, source: allBorrowersType[i] });
    }
  }

  return (
    <>
      <h2>
        <strong>4</strong>Delinquency Summry
      </h2>
      <p style={{ textAlign: "right" }}>*Based on last 48 months data.</p>
      <h2>
        <strong>4.1</strong>As Borrower
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec">
        <DeliquencyLabel />
        <tbody>
          <tr>
            <td colSpan={11}>On Member</td>
          </tr>
          <tr>
            <td
              colSpan={11}
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Delinquency As Borrower
            </td>
          </tr>
          <tr>
            <td colSpan={11}>Off Member</td>
          </tr>

          <tr>
            {Array.isArray(flatMapBorrowers)
              ? flatMapBorrowers?.map((data) => (
                  <>
                    <td>{data?.source}</td>
                    <td>{data?.CF_Type}</td>
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

const DeliquencyLabel = () => {
  return (
    <thead className="thead-dark">
      <tr>
        <th scope="col">Lender</th>
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
  );
};
