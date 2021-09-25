import { PaymentHistory } from "./paymentHistory";
import { BalanceHistory } from "./balanceHistory";
import { DishonouredChequeDetails } from "./dishonorChequeDetails";
import { SecurityCollateralDetails } from "./securityCollateralDetails";

export const AccountDetails = ({ accountDetails }) => {
  return (
    <>
      <tr>
        <td
          colSpan={15}
          style={{ padding: 0, border: "hidden" }}
          className="align-left-sec"
        >
          <table
            className="table bro-none"
            style={{ marginBottom: "0", border: "solid 1px #dee2e6" }}
          >
            <tbody>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Acct# : {accountDetails?.accountNumber ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Institution :{accountDetails?.institution ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Loan Activation/Sanctioned Date :{" "}
                  {accountDetails?.sanctionDateLoanActivation ?? "-"}
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Loan Expiry/Maturity Date :{" "}
                  {accountDetails?.loanExpiryMaturityDate ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Current Balance/Limit Utilized/Mark to Market :{" "}
                  {accountDetails?.currentBalanceLimitUtilizedMarkToMarket ??
                    "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Credit Type :{accountDetails?.creditType ?? "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
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
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Date Reportd : {accountDetails?.dtReportedLst ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Currency : {accountDetails?.currencyCode ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Past Due Amount :{" "}
                  {accountDetails?.assetClassificationDaysPastDue}
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Last Payment : {accountDetails?.lastRepaidAmount ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  High Credit :{accountDetails?.highCredit ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Guarantee Coverage :{accountDetails?.guaranteeCoverage ?? "-"}
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Written Off Amount :{accountDetails?.writtenOffAmount ?? "-"}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Loan Renewal Date :{accountDetails?.loanRenewalDate}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Drawing Power : {accountDetails?.drawingPower}
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Settled Amount :{accountDetails?.settledAmount}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Sanction Amount/NAOC :{" "}
                  {accountDetails?.sanctionedAmountNotionalAmountOfContract}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Amt.of NPA Contracts :
                  {accountDetails?.amountOfContractsClassifiedNpa}
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Tenure/WAMPOC :{" "}
                  {accountDetails?.tenureWeightedAvgMaturityPeriod}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Repayment Frequency : {accountDetails?.repaymentFrequency}
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Monthly Payment Amount : {accountDetails?.installmentAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
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
                <td style={{ width: "33%" }} className="align-left-sec">
                  Account Status : {accountDetails?.accountStatus}
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Status Date :{accountDetails?.accountStatusDt}
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Suit Filed Status : {accountDetails?.suitFiledStatus}
                </td>
              </tr>
              <tr>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Suit Filed Date :{accountDetails?.date_of_suit ?? "-"}
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Wilful Default Status :{" "}
                  {accountDetails?.wilfulDefaultStatus ?? "-"}
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Wilful Default Date :
                  {accountDetails?.dateClassifiedAsWilfulDefault ?? "-"}
                </td>
              </tr>
              <tr>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Restructuring Reason :
                  {accountDetails?.majorReasonsForRestructuring}
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Dispute Code :{accountDetails?.disputeIdNo}
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  NOARC :
                  {
                    accountDetails?.notionalAmountOutstandingRestructuredContracts
                  }
                </td>
              </tr>
              <tr>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Asset Based Security Coverage :
                  {accountDetails?.assetBasedSecurityCoverage}
                </td>
                <td style={{ width: "33%" }} className="align-left-sec"></td>
                <td style={{ width: "33%" }} className="align-left-sec"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <PaymentHistory paymentHistory={accountDetails?.history48Months} />
      <BalanceHistory balanceHistory={accountDetails?.history48Months} />
      <DishonouredChequeDetails
        dishounouredDetails={accountDetails?.dishonouredChequeDetails}
      />
      <SecurityCollateralDetails
        securitySegmentDetails={accountDetails?.securitySgmnt}
      />
    </>
  );
};
