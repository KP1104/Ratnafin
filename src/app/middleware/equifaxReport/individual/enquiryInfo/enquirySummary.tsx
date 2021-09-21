export const EnquirySummary = ({ enquirySummaryDetails }) => {
  return (
    <div className="enquiry-sec">
      <h2>Enquiry Summary:</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col" colSpan={15} style={{ textAlign: "center" }}>
              <span className="heading-color">Enquiry Summary</span>
            </th>
          </tr>
          <tr>
            <td className="entity-table-sec">Purpose</td>
            <td className="entity-table-sec">
              : {enquirySummaryDetails?.purpose}
            </td>
            <td className="entity-table-sec">Total</td>
            <td className="entity-table-sec">
              : {enquirySummaryDetails?.total}
            </td>
            <td className="entity-table-sec">Past 30 days</td>
            <td className="entity-table-sec">
              : {enquirySummaryDetails?.past30Days}
            </td>
          </tr>
          <tr>
            <td className="entity-table-sec">Past 12 Months</td>
            <td className="entity-table-sec">
              : {enquirySummaryDetails?.past12Months}
            </td>
            <td className="entity-table-sec">Past 24 Months</td>
            <td className="entity-table-sec">
              : {enquirySummaryDetails?.past24Months}
            </td>
            <td className="entity-table-sec">Recent</td>
            <td className="entity-table-sec">
              : {enquirySummaryDetails?.recent}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

{
  /* <th scope="col">
<span className="heading-color">Purpose</span>
</th>
<th scope="col">
<span className="heading-color">Total</span>
</th>
<th scope="col">
<span className="heading-color">Past 30 Days</span>
</th>
<th scope="col">
<span className="heading-color">Past 12 Months</span>
</th>
<th scope="col">
<span className="heading-color">Past 24 Months</span>
</th>
<th scope="col">
<span className="heading-color">Recent</span>
</th> */
}
