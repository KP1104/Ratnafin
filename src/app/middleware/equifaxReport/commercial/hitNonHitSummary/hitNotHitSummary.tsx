export const HitAndNonHitSummary = ({ hitNonHitSummaryDetails }) => {
  return (
    <>
      <h2>
        <strong>11</strong> Hit/No-hit summary for Guarantors / Related
        Individual / Related Entity
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <tbody>
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
              <span className="heading-color">Consumer / Entity Name</span>
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              <span className="heading-color">Retail HIT</span>
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              <span className="heading-color">MFI HIT</span>
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              <span className="heading-color">Commercial HIT</span>
            </th>
          </tr>
          <tr>
            {Array.isArray(hitNonHitSummaryDetails) &&
            Boolean(hitNonHitSummaryDetails) ? (
              hitNonHitSummaryDetails.map((hitNonHitDtails) => (
                <>
                  <td style={{ textAlign: "center" }}>
                    {hitNonHitDtails?.Name ?? "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {hitNonHitDtails?.RTL_Hit ?? "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {hitNonHitDtails?.MFI_Hit ?? "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {hitNonHitDtails?.Commercial_Hit ?? "-"}
                  </td>
                </>
              ))
            ) : (
              <td colSpan={12}>Data not Found</td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
