export const BalanceHistory = () => {
  return (
    <tr>
      <td style={{ width: "25%", border: "none" }}>
        <BalanceHistoryLabel />
      </td>
      <td style={{ width: "85%" }}>
        <History48Months />
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

const History48Months = () => {
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
                <tr></tr>
                <tr>
                  <td style={{ textAlign: "center" }}>-</td>
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
                <tr>
                  <td style={{ textAlign: "center" }}>-</td>
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
                <tr>
                  <td style={{ textAlign: "center" }}>-</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
