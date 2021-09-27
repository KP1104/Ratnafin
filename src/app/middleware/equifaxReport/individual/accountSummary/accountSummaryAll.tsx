export const AccountSummaryAll = ({ accountSummary }) => {
  return (
    <div className="summary-sec">
      <h2>Summary* :</h2>
      <h3>Credit Report Summary</h3>
      <table className="table">
        <tbody>
          <tr>
            <td>
              <span>Number of Accounts :</span>{" "}
              <b>{accountSummary?.noOfAccounts}</b>
            </td>
            <td>
              <span>Total Balance Amount :</span>{" "}
              <b>Rs.{accountSummary?.totalBalanceAmount}</b>
            </td>
            <td>
              <span>Recent Account :</span>
              <b>{accountSummary?.recentAccount}</b>
            </td>
          </tr>
          <tr>
            <td>
              <span>Number of Open Accounts :</span>{" "}
              <b>{accountSummary?.noOfActiveAccounts}</b>
            </td>
            <td>
              <span>Total Past Due Amount :</span>{" "}
              <b>Rs.{accountSummary?.totalPastDue}</b>
            </td>
            <td>
              <span>Oldest Account :</span>
              <b>{accountSummary?.oldestAccount}</b>
            </td>
          </tr>
          <tr>
            <td>
              <span>Number of Past Due Accounts :</span>{" "}
              <b>{accountSummary?.noOfPastDueAccounts}</b>
            </td>
            <td>
              <span>Total High Credit :</span>{" "}
              <b>{accountSummary?.totalHighCredit}</b>
            </td>
            <td>
              <span>Total Credit Limit :</span>{" "}
              <b>Rs.{accountSummary?.totalCreditLimit}</b>
            </td>
          </tr>
          <tr>
            <td>
              <span>Number of Write-off Accounts :</span>{" "}
              <b>{accountSummary?.noOfWriteOffs}</b>
            </td>
            <td>
              <span>Total Sanction Amount :</span>{" "}
              <b>Rs.{accountSummary?.totalSanctionAmount}</b>
            </td>
            <td>
              <span>Single Highest Credit :</span>{" "}
              <b>{accountSummary?.singleHighestCredit}</b>
            </td>
          </tr>
          <tr>
            <td>
              <span>Number of Zero Balance Accounts :</span>
              <b>{accountSummary?.noOfZeroBalanceAccounts}</b>
            </td>
            <td>
              <span>Total Monthly Payment Amount :</span>
              <b>Rs.{accountSummary?.totalMonthlyPaymentAmount}</b>
            </td>
            <td>
              <span>Single Highest Sanction Amount :</span>
              <b>Rs.{accountSummary?.singleHighestSanctionAmount}</b>
            </td>
          </tr>
          <tr>
            <td>
              <span>Most Severe Status less than 24 Months :</span>
              <b>{accountSummary?.mostSevereStatusWithIn24Months}</b>
            </td>
            <td>
              <span>Average Open Balance :</span>{" "}
              <b>Rs.{accountSummary?.averageOpenBalance}</b>
            </td>
            <td>
              <span>Single Highest Balance :</span>{" "}
              <b>Rs.{accountSummary?.singleHighestBalance}</b>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        *As per data reported at a tradeline level in the account details
        section
      </p>
    </div>
  );
};
