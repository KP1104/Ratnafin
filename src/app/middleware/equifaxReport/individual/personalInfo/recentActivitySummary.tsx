export const RecentActivitySummary = ({ recentActivitySummaryDetails }) => {
  return (
    <div className="recent-sec">
      <h2>Recent Activity:</h2>
      <table className="table">
        <tbody>
          <tr>
            <th colSpan={4} scope="col" style={{ textAlign: "center" }}>
              <span className="heading-color">
                Recent Activity (last 90 days)
              </span>
            </th>
          </tr>
          <tr>
            <td>
              <span>Total Inquiries :</span>
              {recentActivitySummaryDetails?.totalInquiries}
            </td>
            <td>
              <span>Accounts Opened :</span>
              {recentActivitySummaryDetails?.accountsOpened}
            </td>
            <td>
              <span>Accounts Updated :</span>
              {recentActivitySummaryDetails?.accountsUpdated}
            </td>
            <td>
              <span>Accounts Delinquent :</span>
              {recentActivitySummaryDetails?.accountsDeliquent}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
