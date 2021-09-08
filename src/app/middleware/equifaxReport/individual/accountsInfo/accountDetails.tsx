import { History } from "./history";

export const AccountDetails = ({ accountDetail, count }) => {
  return (
    <div className={`account-part account-small`}>
      <table
        className="table"
        style={{
          marginBottom: 0,
          borderBottom: "none",
        }}
      >
        <thead className="thead-dark">
          <tr>
            <th colSpan={10} scope="col" style={{ textAlign: "center" }}>
              Account: {`${accountDetail?.AccountType}`}
            </th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "none" }}>
          <tr>
            <td>
              Acct # <strong>{accountDetail?.AccountNumber}</strong>
            </td>
            <td>
              Balance: <strong>Rs.{accountDetail?.Balance}</strong>
            </td>
            <td>
              Open: <strong>{accountDetail?.Open}</strong>
            </td>
            <td>
              Date Reported: <strong>{accountDetail?.DateReported}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Institution: <strong>{accountDetail?.Institution}</strong>
            </td>
            <td>
              Past Due Amount:{" "}
              <strong>Rs.{accountDetail?.PastDueAmount}</strong>
            </td>
            <td>
              Interest Rate:<strong>{accountDetail?.InterestRate}</strong>
            </td>
            <td>
              Date Opened: <strong>{accountDetail?.DateOpened}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Type: <strong>{accountDetail?.AccountType}</strong>
            </td>
            <td>
              Last Payment:<strong>Rs.{accountDetail?.LastPayment}</strong>
            </td>
            <td>
              Last Payment Date:
              <strong>{accountDetail?.LastPaymentDate ?? "-"}</strong>
            </td>
            <td>
              Date Closed:<strong>{accountDetail?.DateClosed ?? "-"}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Ownership Type:{" "}
              <strong>{accountDetail?.OwnershipType ?? "-"}</strong>
            </td>
            <td>
              Write-off Amount:<strong></strong>
            </td>
            <td>
              Sanction Amount :
              <strong>Rs.{accountDetail?.SanctionAmount}</strong>
            </td>
            <td>
              Reason:<strong>{accountDetail?.Reason}</strong>
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td>Repayment Tenure: {accountDetail?.RepaymentTenure}</td>
            <td>Monthly Payment Amount:</td>
            <td>
              Credit Limit:
              <strong>{accountDetail?.CreditLimit ?? "-"}</strong>
            </td>
            <td>Collateral Value:{accountDetail?.CollateralValue}</td>
          </tr>
          <tr>
            <td>Dispute Code:</td>
            <td>Term Frequency: {accountDetail?.TermFrequency}</td>
            <td>Collateral Type:{accountDetail?.CollateralType}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              Account status: <strong>{accountDetail?.AccountStatus}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Asset Classification:
              <strong>{accountDetail?.AssetClassification}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Suit Filed Status:<strong></strong>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <History history={accountDetail?.History48Months} />
    </div>
  );
};
