export const EnquirySummary = ({ enquirySummaryDetails }) => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>8</strong> Enquiry Summary
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col" colSpan={15} style={{ textAlign: "center" }}>
              Enquiry Summary
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="entity-bro-none">Purpose</td>
            <td className="entity-bro-none">
              : {enquirySummaryDetails?.Purpose}
            </td>
            <td className="entity-bro-none">Total</td>
            <td className="entity-bro-none">
              : {enquirySummaryDetails?.Total}
            </td>
            <td className="entity-bro-none">Past 30 days</td>
            <td className="entity-bro-none">
              : {enquirySummaryDetails?.Past30Days}
            </td>
          </tr>
          <tr>
            <td className="entity-bro-none">Past 12 Months</td>
            <td className="entity-bro-none">
              : {enquirySummaryDetails?.Past12Months}
            </td>
            <td className="entity-bro-none">Past 24 Months</td>
            <td className="entity-bro-none">
              : {enquirySummaryDetails?.past24Months}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
