export const HitAndNonHitSummary = () => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>11</strong> Hit/No-hit summary for Guarantors / Related
        Individual / Related Entity
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
              Consumer / Entity Name
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Retail HIT
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              MFI HIT
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Commercial HIT
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>Y</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>N</td>
            <td style={{ textAlign: "center" }}>N</td>
            <td style={{ textAlign: "center" }}></td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>N</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>N</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>N</td>
            <td style={{ textAlign: "center" }}>N</td>
            <td style={{ textAlign: "center" }}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
