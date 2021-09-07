export const History = ({ history }: any) => {
  const historyFirst16Months = history.slice(0, 16);
  const historySecond16Months = history.slice(16, 32);
  const historyThird16Months = history.slice(32, 48);
  return (
    <table className="table" style={{ borderTop: "none", marginTop: "5px" }}>
      <tbody style={{ borderTop: "none" }}>
        <tr>
          <td>History</td>
        </tr>
        <tr>
          <td style={{ width: "15%" }}>
            <Histroy24MonthsLabel />
          </td>
          <td style={{ width: "60%" }}>
            <table className="table history-monthly">
              <tbody>
                <tr>
                  <td>
                    <History24Months history={historyFirst16Months} />
                  </td>
                </tr>
                <hr />
              </tbody>
            </table>
          </td>
        </tr>
        {Array.isArray(historySecond16Months) &&
        historySecond16Months?.length > 0 ? (
          <tr>
            <td style={{ width: "15%" }} />
            <td style={{ width: "60%" }}>
              <History24Months history={historySecond16Months} />
              <hr />
            </td>
          </tr>
        ) : null}
        {Array.isArray(historyThird16Months) &&
        historyThird16Months?.length > 0 ? (
          <tr>
            <td style={{ width: "15%" }} />
            <td style={{ width: "60%" }}>
              <History24Months history={historyThird16Months} />
              <hr />
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

const Histroy24MonthsLabel = () => {
  return (
    <table className="table history-sec">
      <tbody>
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
    <table className="table monthly-sec">
      <tbody>
        <tr>
          {history.map((history) => (
            <td className="fixedStyleHistory">{history?.PaymentStatus}</td>
          ))}
        </tr>
        <tr>
          {history.map((history) => (
            <td className="fixedStyleHistory">
              {history?.AssetClassificationStatus}
            </td>
          ))}
        </tr>
        <tr>
          {history?.map((history) => (
            <td className="fixedStyleHistory">{history?.SuitFiledStatus}</td>
          ))}
        </tr>
        <tr>
          {history?.map((history) => (
            <td className="fixedStyleHistory">{history?.key}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
