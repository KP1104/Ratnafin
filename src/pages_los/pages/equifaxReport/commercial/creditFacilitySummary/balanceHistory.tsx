export const BalanceHistory = () => {
  return (
    <tr>
      <td style={{ width: "25%", border: "none" }}>
        <table className="table" style={{ marginBottom: "0" }}>
          <tbody>
            <tr>
              <td
                colSpan={15}
                style={{ padding: 0, border: "none !important" }}
              >
                <table className="table" style={{ marginBottom: "0" }}>
                  <tbody>
                    <tr>
                      <td colSpan={3} style={{ border: "none !important" }}>
                        Balance History 48 Months :
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ border: "none !important" }}>
                        Months :
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ border: "none !important" }}>
                        Current Balance (INR) :
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ border: "none !important" }}>
                        Overdue Amt.(INR) :
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td style={{ width: "85%" }}>
        <table className="table history-monthly" style={{ marginBottom: "0" }}>
          <tbody>
            <tr>
              <td
                style={{ border: "none !important", padding: "0 !important" }}
              >
                <table
                  className="table monthly-sec"
                  style={{ marginBottom: "0" }}
                >
                  <tbody>
                    <tr>
                      <td
                        colSpan={12}
                        style={{ border: " none !important" }}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ border: "none !important", padding: "0" }}>
                <table
                  className="table monthly-sec"
                  style={{ marginBottom: "0" }}
                >
                  <tbody>
                    <tr></tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>02-19</td>
                      <td style={{ textAlign: "center" }}>01-19</td>
                      <td style={{ textAlign: "center" }}>12-18</td>
                      <td style={{ textAlign: "center" }}>11-18</td>
                      <td style={{ textAlign: "center" }}>10-18</td>
                      <td style={{ textAlign: "center" }}>09-18</td>
                      <td style={{ textAlign: "center" }}>08-18</td>
                      <td style={{ textAlign: "center" }}>07-18</td>
                      <td style={{ textAlign: "center" }}>06-18</td>
                      <td style={{ textAlign: "center" }}>05-18</td>
                      <td style={{ textAlign: "center" }}>04-18</td>
                      <td style={{ textAlign: "center" }}>03-18</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ border: "none !important", padding: "0" }}>
                <table
                  className="table monthly-sec"
                  style={{ marginBottom: "0" }}
                >
                  <tbody>
                    <tr></tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>*</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ border: "none !important", padding: "0" }}>
                <table
                  className="table monthly-sec"
                  style={{ marginBottom: "0" }}
                >
                  <tbody>
                    <tr></tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>0</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>*</td>
                      <td style={{ textAlign: "center" }}>*</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};
