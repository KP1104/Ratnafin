export const EnquiryDetails = () => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>9</strong> Enquiry Details
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
              Institution
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Date
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Time
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Purpose
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>No Enquiry Data</td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
