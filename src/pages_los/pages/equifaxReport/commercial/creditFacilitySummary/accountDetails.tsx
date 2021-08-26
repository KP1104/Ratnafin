import { PaymentHistory } from "./paymentHistory";
import { BalanceHistory } from "./balanceHistory";
import { DishonouredChequeDetails } from "./dishonorChequeDetails";
import { SecurityCollateralDetails } from "./securityCollateralDetails";

export const AccountDetails = () => {
  return (
    <>
      <tr>
        <td colSpan={15} style={{ padding: 0 }} className="align-left-sec">
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
                  Acct# : ***
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Institution :
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Loan Activation/Sanctioned Date : 09-05-2014
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Loan Expiry/Maturity Date : 10-05-2014
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Current Balance/Limit Utilized/Mark to Market : 0
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Credit Type : Medium term loan (period abobve 1 year and up to
                  3 years)
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
                  Date Reportd : 28-02-2019
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Currency : INR
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Past Due Amount : 0
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Last Payment : 6,532
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  High Creadit :
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Guarantee Coverage :
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Written Off Amount :
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Loan Renewal Date :
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Drawing Power : 0
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Settled Amount :
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Sanction Amount/NAOC : 56,00,000
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Amt.of NPA Contracts :
                </td>
              </tr>
              <tr>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Tenure/WAMPOC : 1
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Repayment Frequency : Monthly
                </td>
                <td
                  className="align-left-sec"
                  style={{
                    width: "33%",
                  }}
                >
                  Monthly Payment Amount : 56,00,00
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
                  Account Status : Open
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Status Date :
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Suit Filed Status : Not a Suit Filed Case
                </td>
              </tr>
              <tr>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Suit Filed Date :
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Wilful Default Status : Not Wilful Defaulte
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Wilfu Default Date :
                </td>
              </tr>
              <tr>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Restructuring Reason :
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Dispute Code :
                </td>
                <td style={{ width: "33%" }} className="align-left-sec">
                  NOARC :
                </td>
              </tr>
              <tr>
                <td style={{ width: "33%" }} className="align-left-sec">
                  Asset Based Security Coverage :
                </td>
                <td style={{ width: "33%" }} className="align-left-sec"></td>
                <td style={{ width: "33%" }} className="align-left-sec"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <PaymentHistory />
      <BalanceHistory />
      <DishonouredChequeDetails />
      <SecurityCollateralDetails />
    </>
  );
};
