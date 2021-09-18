import { DerogatoryLabel, DerogatoryDetails } from "./derogatoryLabel";

export const DerogatoryBorrower = ({ borrowerDerogatory = {} }) => {
  const flatMapBorrowers: any = [];
  if (Boolean(borrowerDerogatory)) {
    const asBorrower = borrowerDerogatory;
    const allBorrowersType = Object.keys(asBorrower);
    for (let i = 0; i < allBorrowersType.length; i++) {
      for (const one of asBorrower[allBorrowersType[i]]) {
        flatMapBorrowers.push({ ...one, source: allBorrowersType[i] });
      }
    }
  }

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
        <tbody>
          <DerogatoryLabel />
          {Array.isArray(flatMapBorrowers) && flatMapBorrowers.length > 0 ? (
            <DerogatoryDetails derogatoryDetails={flatMapBorrowers} />
          ) : (
            <td colSpan={12}>No Borrower Details</td>
          )}
        </tbody>
      </table>
    </>
  );
};
