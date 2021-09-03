export const EnquirySummary = ({ enquirySummaryDetails }) => {
  return (
    <div className="enquiry-sec">
      <h2>Enquiry Summary:</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Purpose</th>
            <th scope="col">Total</th>
            <th scope="col">Past 30 Days</th>
            <th scope="col">Past 12 Months</th>
            <th scope="col">Past 24 Months</th>
            <th scope="col">Recent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{enquirySummaryDetails?.purpose}</td>
            <td>{enquirySummaryDetails?.total}</td>
            <td>{enquirySummaryDetails?.past30Days}</td>
            <td>{enquirySummaryDetails?.past12Months}</td>
            <td>{enquirySummaryDetails?.past24Months}</td>
            <td>{enquirySummaryDetails?.recent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
