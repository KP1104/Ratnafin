export const EnquirySummary = () => {
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
            <td style={{ border: "none !important" }}>Purpose</td>
            <td style={{ border: "none !important" }}>: All</td>
            <td style={{ border: "none !important" }}>Total</td>
            <td style={{ border: "none !important" }}>: 0</td>
            <td style={{ border: "none !important" }}>Past 30 days</td>
            <td style={{ border: "none !important" }}>: 0</td>
          </tr>
          <tr>
            <td style={{ border: "none !important" }}>Past 12 Months</td>
            <td style={{ border: "none !important" }}>: 0</td>
            <td style={{ border: "none !important" }}>Past 24 Months</td>
            <td style={{ border: "none !important" }}>: 0</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
