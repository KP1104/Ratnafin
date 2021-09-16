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
        <strong>4</strong> Delinquency Summary
      </h2>
      <p style={{ textAlign: "right" }}>*Based on last 48 months data.</p>
      <h2>
        <strong>4.1</strong> As Borrower
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec borrower-table-sec-box">
        <tbody>
          <DeliquencyLabel />
          <tr>
            <td colSpan={11}>
              <b>On Member</b>
            </td>
          </tr>
          <DeliquencyDetails flatMapBorrowers={flatMapBorrowers} />
          <tr>
            <td colSpan={11}>
              <b>Off Member</b>
            </td>
          </tr>
          <DeliquencyDetails flatMapBorrowers={flatMapBorrowers} />
        </tbody>
      </table>
    </>
  );
};

const DeliquencyLabel = () => {
  return (
    <tr>
      <th scope="col">
        <span className="heading-color">Lender</span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">Credit Facility Type</span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">Current Overdue Bucket</span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">Current Account Classification</span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">Most recent Delinquency Date</span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">
          Earliest Delinquency Date(Last 48 months)
        </span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">No of times Delinquent</span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">
          Most severe DPD/ Asset Class (last 48 Months)
        </span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">
          Max Consecutive Overdue Period (In months)
        </span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">
          Highest Overdue Amount (In last 48 months)
        </span>
      </th>
      <th scope="col">
        {" "}
        <span className="heading-color">Current Overdue Amount</span>
      </th>
    </tr>
  );
};

const DeliquencyDetails = ({ flatMapBorrowers }) => {
  return (
    <>
      {Array.isArray(flatMapBorrowers) ? (
        flatMapBorrowers?.map((data) => (
          <tr>
            <td>{data?.source.split("Off-Member ")}</td>
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
          </tr>
        ))
      ) : (
        <td>Data not available</td>
      )}
    </>
  );
};
