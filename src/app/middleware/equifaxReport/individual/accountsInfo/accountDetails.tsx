import { History } from "./history";
export const AccountDetails = ({ accountDetail, count }) => {
  return (
    <>
      <tr style={{ width: "100%", display: "table" }}>
        <td colSpan={15}>
          <table
            className="table bro-none"
            style={{ marginBottom: "0", border: "solid 1px #dee2e6" }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Acct # <strong>{accountDetail?.AccountNumber}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Balance: <strong>Rs.{accountDetail?.Balance}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Open: <strong>{accountDetail?.Open}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Date Reported: <strong>{accountDetail?.DateReported}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Institution: <strong>{accountDetail?.Institution}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Past Due Amount:{" "}
                  <strong>Rs.{accountDetail?.PastDueAmount}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Interest Rate:<strong>{accountDetail?.InterestRate}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Date Opened: <strong>{accountDetail?.DateOpened}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Type: <strong>{accountDetail?.AccountType}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Last Payment:<strong>Rs.{accountDetail?.LastPayment}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Last Payment Date:
                  <strong>{accountDetail?.LastPaymentDate ?? "-"}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Date Closed:
                  <strong>{accountDetail?.DateClosed ?? "-"}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Ownership Type:{" "}
                  <strong>{accountDetail?.OwnershipType ?? "-"}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Write-off Amount:<strong></strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Sanction Amount :
                  <strong>Rs.{accountDetail?.SanctionAmount}</strong>
                </td>
                <td
                  style={{
                    width: "25%",
                  }}
                >
                  Reason:<strong>{accountDetail?.Reason}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr style={{ width: "100%", display: "table" }}>
        <td
          colSpan={15}
          style={{ padding: 0 }}
          className="align-left-sec"
          borrower-table-bro-one
        >
          <table
            className="table bro-none"
            style={{ marginBottom: 0, border: "solid 1px #dee2e6" }}
          >
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
          </table>
        </td>
      </tr>
      <tr style={{ width: "100%", display: "table" }}>
        <td
          colSpan={15}
          style={{ padding: 0 }}
          className="borrower-table-bro-one"
        >
          <table
            className="table bro-none"
            style={{ marginBottom: 0, border: "solid 1px #dee2e6" }}
          >
            <tbody>
              <tr>
                <td>
                  Account status:{" "}
                  <strong>{accountDetail?.AccountStatus}</strong>
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
        </td>
      </tr>
      <History history={accountDetail?.History48Months} />
    </>
  );
};
