export const SecurityCollateralDetails = ({ securitySegmentDetails }) => {
  return (
    <tr>
      <td
        colSpan={15}
        style={{ padding: 0 }}
        className="borrower-table-bro-one"
      >
        <table className="table borrower-table-sec" style={{ marginBottom: 0 }}>
          <tr>
            <th scope="col" colSpan={15} className="align-center-sec">
              <span className="heading-color">Security/Colletral Details</span>
            </th>
          </tr>
          <tr>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Security Value</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Currency Type</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Security Type</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Security Classification</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Date of Valuation</span>
            </th>
          </tr>
          <tbody>
            {Array.isArray(securitySegmentDetails) &&
            Boolean(securitySegmentDetails) ? (
              securitySegmentDetails.map((segmentData) => (
                <tr>
                  <td>{segmentData?.value_of_security}</td>
                  <td>{segmentData?.currency_type}</td>
                  <td>{segmentData?.type_of_security}</td>
                  <td>{segmentData?.security_classification}</td>
                  <td>{segmentData?.date_of_valuation}</td>
                </tr>
              ))
            ) : (
              <td colSpan={15} className="align-center-sec">
                No Security/Colletral Details
              </td>
            )}
          </tbody>
        </table>
      </td>
    </tr>
  );
};
