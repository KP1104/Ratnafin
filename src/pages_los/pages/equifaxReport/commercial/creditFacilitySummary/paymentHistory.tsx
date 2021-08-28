export const PaymentHistory = ({ paymentHistory }) => {
  const historyFirst12Months = paymentHistory?.slice(0, 12);
  const historySecond12Months = paymentHistory?.slice(12, 24);
  const historyThird12Months = paymentHistory?.slice(24, 36);
  const historyFourth12Months = paymentHistory?.slice(36, 48);
  return (
    <tr>
      <td style={{ width: "25%", border: "none" }}>
        <table className="table" style={{ marginBottom: "0" }}>
          <tbody>
            <tr>
              <td
                colSpan={15}
                style={{
                  padding: "0",
                  verticalAlign: "top",
                }}
                className="borrower-table-bro-one"
              >
                <Histroy24MonthsLabel />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td style={{ width: "85%" }}>
        <History48Months history={historyFirst12Months} />
        {Array.isArray(historySecond12Months) &&
        historySecond12Months?.length > 0 ? (
          <tr>
            <td style={{ width: "15%" }} />
            <td style={{ width: "60%" }}>
              <History48Months history={historySecond12Months} />
              <hr />
            </td>
          </tr>
        ) : null}
        {Array.isArray(historyThird12Months) &&
        historyThird12Months?.length > 0 ? (
          <tr>
            <td style={{ width: "15%" }} />
            <td style={{ width: "60%" }}>
              <History48Months history={historyThird12Months} />
              <hr />
            </td>
          </tr>
        ) : null}
        {Array.isArray(historyFourth12Months) &&
        historyFourth12Months?.length > 0 ? (
          <tr>
            <td style={{ width: "15%" }} />
            <td style={{ width: "60%" }}>
              <History48Months history={historyFourth12Months} />
              <hr />
            </td>
          </tr>
        ) : null}
      </td>
    </tr>
  );
};

const Histroy24MonthsLabel = () => {
  return (
    <table className="table borrower-table-sec" style={{ marginBottom: 0 }}>
      <tbody>
        <tr>
          <td colSpan={3} className="borrower-table-bro-one">
            Payment History 48 months :
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="borrower-table-bro-one">
            Overdue Bucket :
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="borrower-table-bro-one">
            Asset Classification :
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="borrower-table-bro-one">
            Suit Filed Status :
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="borrower-table-bro-one">
            Months :
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const History48Months = ({ history }) => {
  return (
    <table className="table history-monthly" style={{ marginBottom: "0" }}>
      <tbody>
        <tr>
          <td className="borrower-table-bro-one borrower-table-padding-one">
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                <tr>
                  <td colSpan={12} className="borrower-table-bro-one"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ padding: "0" }} className="borrower-table-bro-one">
            <table
              className="table monthly-sec"
              style={{ marginBottom: "0", textAlign: "center" }}
            >
              <tbody>
                <tr></tr>
                <tr style={{ textAlign: "center" }}>
                  {history.map((history) => (
                    <td>{history?.overdueBucket ?? "-"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ padding: "0" }} className="borrower-table-bro-one">
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                <tr></tr>
                <tr>
                  {history.map((history) => (
                    <td>{history?.AssetClassificationStatus ?? "-"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ padding: "0" }} className="borrower-table-bro-one">
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                <tr></tr>
                <tr>
                  {history.map((history) => (
                    <td>{history?.SuitFiledStatus ?? "-"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td style={{ padding: "0" }} className="borrower-table-bro-one">
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                <tr></tr>
                <tr>
                  {history.map((history) => (
                    <td>{history?.yyyymm ?? "-"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
