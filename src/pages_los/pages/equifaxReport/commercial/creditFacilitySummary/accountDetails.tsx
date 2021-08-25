import { PaymentHistory } from "./paymentHistory";
import { BalanceHistory } from "./balanceHistory";
import { DishonouredChequeDetails } from "./dishonorChequeDetails";
import { SecurityCollateralDetails } from "./securityCollateralDetails";

export const AccountDetails = () => {
  return (
    <tbody>
      <tr>
        <td colSpan={15} style={{ padding: 0, border: "none !important" }}>
          <table
            className="table bro-none"
            style={{ marginBottom: "0", border: "solid 1px #dee2e6" }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Acct# : ***
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Institution :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Loan Activation/Sanctioned Date : 09-05-2014
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Loan Expiry/Maturity Date : 10-05-2014
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Current Balance/Limit Utilized/Mark to Market : 0
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
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
        <td colSpan={15} style={{ padding: 0, border: "none !important" }}>
          <table
            className="table bro-none"
            style={{ marginBottom: 0, border: "solid 1px #dee2e6" }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Date Reportd : 28-02-2019
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Currency : INR
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Past Due Amount : 0
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Last Payment : 6,532
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  High Creadit :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Guarantee Coverage :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Written Off Amount :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Loan Renewal Date :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Drawing Power : 0
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Settled Amount :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Sanction Amount/NAOC : 56,00,000
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Amt.of NPA Contracts :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Tenure/WAMPOC : 1
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Repayment Frequency : Monthly
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
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
        <td colSpan={15} style={{ padding: 0, border: "none !important" }}>
          <table
            className="table bro-none"
            style={{ marginBottom: 0, border: "solid 1px #dee2e6" }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Account Status : Open
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Status Date :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Suit Filed Status : Not a Suit Filed Case
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Suit Filed Date :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Wilful Default Status : Not Wilful Defaulte
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Wilfu Default Date :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Restructuring Reason :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Dispute Code :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  NOARC :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                >
                  Asset Based Security Coverage :
                </td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                ></td>
                <td
                  style={{
                    width: "33%",
                    //@ts-ignore
                    textAlign: "left !important",
                  }}
                ></td>
              </tr>
              <PaymentHistory />
              <BalanceHistory />
              <DishonouredChequeDetails />
              <SecurityCollateralDetails />
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  );
};
