export const History = ({ history }: any) => {
  const historyFirst24Months = history.slice(0, 24);
  const historySecond24Months = history.slice(24, 48);
  return (
    <table className="table" style={{ borderTop: "none" }}>
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
                    <History24Months history={historyFirst24Months} />
                  </td>
                </tr>
                <hr />
              </tbody>
            </table>
          </td>
        </tr>
        {Array.isArray(historySecond24Months) &&
        historySecond24Months?.length > 0 ? (
          <tr>
            <td style={{ width: "15%" }} />
            <td style={{ width: "60%" }}>
              <History24Months history={historySecond24Months} />
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
            <td>{history?.PaymentStatus}</td>
          ))}
        </tr>
        <tr>
          {history.map((history) => (
            <td>{history?.AssetClassificationStatus}</td>
          ))}
        </tr>
        <tr>
          {history?.map((history) => (
            <td>{history?.SuitFiledStatus}</td>
          ))}
        </tr>
        <tr>
          {history?.map((history) => (
            <td>{history?.key}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
