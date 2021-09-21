export const History = ({ history }: any) => {
  const historyFirst16Months = history.slice(0, 16);
  const historySecond16Months = history.slice(16, 32);
  const historyThird16Months = history.slice(32, 48);
  return (
    <tr style={{ width: "100%", display: "table" }}>
      <td style={{ width: "15%", border: "none" }}>
        <table style={{ marginBottom: "0" }}>
          <tbody>
            <tr>
              <td
                colSpan={15}
                style={{
                  verticalAlign: "top",
                }}
              >
                <Histroy24MonthsLabel />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td style={{ width: "60%" }}>
        <History24Months history={historyFirst16Months} />
        {Array.isArray(historySecond16Months) &&
        historySecond16Months?.length > 0 ? (
          <History24Months history={historySecond16Months} />
        ) : null}
        {Array.isArray(historyThird16Months) &&
        historyThird16Months?.length > 0 ? (
          <History24Months history={historyThird16Months} />
        ) : null}
      </td>
    </tr>
  );
};

const Histroy24MonthsLabel = () => {
  return (
    <table className="table" style={{ marginBottom: 0 }}>
      <tbody>
        <tr>
          <td colSpan={3}>History</td>
        </tr>
        <tr>
          <td>Account Status :</td>
        </tr>
        <tr>
          <td>Asset Classification :</td>
        </tr>
        <tr>
          <td>Suit Filed Status :</td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  );
};

const History24Months = ({ history }) => {
  return (
    <>
      {/* <table className="table history-monthly" style={{ marginBottom: "0" }}>
        <tbody> */}
      {/* <tr>
        <td>
          <table>
            <tbody>
              <tr>
                <td colSpan={15} className="borrower-table-bro-one"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr> */}
      <tr>
        <td className="borrower-table-bro-one borrower-table-padding-one">
          <table className="table monthly-sec" style={{ marginBottom: "0" }}>
            <tbody>
              <tr>
                {history.map((history) => (
                  <td className="fixedStyleHistory">
                    {history?.PaymentStatus}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td className="borrower-table-bro-one borrower-table-padding-one">
          <table className="table monthly-sec" style={{ marginBottom: "0" }}>
            <tbody>
              <tr>
                {history.map((history) => (
                  <td className="fixedStyleHistory">
                    {history?.AssetClassificationStatus}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td className="borrower-table-bro-one borrower-table-padding-one">
          <table className="table monthly-sec" style={{ marginBottom: "0" }}>
            <tbody>
              <tr>
                {history?.map((history) => (
                  <td className="fixedStyleHistory">
                    {history?.SuitFiledStatus}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td className="borrower-table-bro-one borrower-table-padding-one">
          <table className="table monthly-sec" style={{ marginBottom: "0" }}>
            <tbody>
              <tr>
                {history?.map((history) => (
                  <td className="fixedStyleHistory">{history?.key}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      {/* </tbody>
      </table> */}
    </>
  );
};
