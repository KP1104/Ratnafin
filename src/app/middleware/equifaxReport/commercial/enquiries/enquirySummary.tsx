export const EnquirySummary = ({ enquirySummaryDetails }) => {
  return (
    <>
      <h2>
        <strong>8</strong> Enquiry Summary
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <tbody>
          <tr>
            <th scope="col" colSpan={15} style={{ textAlign: "center" }}>
              <span className="heading-color">Enquiry Summary</span>
            </th>
          </tr>
          <tr>
            <td className="entity-bro-none entity-table-sec">Purpose</td>
            <td className="entity-bro-none entity-table-sec">
              : {enquirySummaryDetails?.Purpose}
            </td>
            <td className="entity-bro-none entity-table-sec">Total</td>
            <td className="entity-bro-none entity-table-sec">
              : {enquirySummaryDetails?.Total}
            </td>
            <td className="entity-bro-none entity-table-sec">Past 30 days</td>
            <td className="entity-bro-none entity-table-sec">
              : {enquirySummaryDetails?.Past30Days}
            </td>
          </tr>
          <tr>
            <td className="entity-bro-none entity-table-sec">Past 12 Months</td>
            <td className="entity-bro-none entity-table-sec">
              : {enquirySummaryDetails?.Past12Months}
            </td>
            <td className="entity-bro-none entity-table-sec">Past 24 Months</td>
            <td className="entity-bro-none entity-table-sec">
              : {enquirySummaryDetails?.Past24Months}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
