export const BalanceHistory = ({ balanceHistory }) => {
  const historyFirst12Months = balanceHistory?.slice(0, 12);
  const historySecond12Months = balanceHistory?.slice(12, 24);
  const historyThird12Months = balanceHistory?.slice(24, 36);
  const historyFourth12Months = balanceHistory?.slice(36, 48);
  return (
    <tr>
      <td style={{ width: "25%", border: "none" }}>
        <table className="table history-left" style={{ marginBottom: "0" }}>
          <tbody>
            <tr>
              <td
                colSpan={15}
                style={{
                  padding: "0",
                }}
                className="entity-bro-none"
              >
                <BalanceHistoryLabel />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td style={{ width: "85%" }}>
        <History48Months history={historyFirst12Months} />
        {Array.isArray(historySecond12Months) &&
        historySecond12Months?.length > 0 ? (
          <>
            <hr />
            <History48Months history={historySecond12Months} />
          </>
        ) : null}
        {Array.isArray(historyThird12Months) &&
        historyThird12Months?.length > 0 ? (
          <>
            <hr />
            <History48Months history={historyThird12Months} />
          </>
        ) : null}
        {Array.isArray(historyFourth12Months) &&
        historyFourth12Months?.length > 0 ? (
          <History48Months history={historyFourth12Months} />
        ) : null}
      </td>
    </tr>
  );
};

const BalanceHistoryLabel = () => {
  return (
    <table className="table" style={{ marginBottom: "0" }}>
      <tbody>
        <tr>
          <td colSpan={15} style={{ padding: 0 }} className="entity-bro-none">
            <table className="table" style={{ marginBottom: "0" }}>
              <tbody>
                <tr>
                  <td colSpan={3} className="entity-bro-none">
                    Balance History 48 Months :
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="entity-bro-none">
                    Months :
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="entity-bro-none">
                    Current Balance (INR) :
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="entity-bro-none">
                    Overdue Amt.(INR) :
                  </td>
                </tr>
              </tbody>
            </table>
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
          <td className="entity-bro-none" style={{ padding: "0 !important" }}>
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                <tr>
                  <td colSpan={12} className="entity-bro-none"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td className="entity-bro-none" style={{ padding: "0" }}>
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                &nbsp;
                <tr style={{ textAlign: "center" }}>
                  {history.map((history) => (
                    <td>{history?.yyyymm ?? "-"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td className="entity-bro-none" style={{ padding: "0" }}>
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                <tr></tr>
                <tr style={{ textAlign: "center" }}>
                  {history.map((history) => (
                    <td>
                      {history?.currentBalanceLimitUtilizedMarktomarket ?? "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td className="entity-bro-none" style={{ padding: "0" }}>
            <table className="table monthly-sec" style={{ marginBottom: "0" }}>
              <tbody>
                <tr></tr>
                <tr style={{ textAlign: "center" }}>
                  {history.map((history) => (
                    <td>{history?.amountOverdueLimitOverdue ?? "-"}</td>
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
