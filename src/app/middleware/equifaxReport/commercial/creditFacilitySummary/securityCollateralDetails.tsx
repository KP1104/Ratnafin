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
                  <td colSpan={3}>{segmentData?.valueOfSecurity}</td>
                  <td colSpan={3}>{segmentData?.currencyType}</td>
                  <td colSpan={3}>{segmentData?.typeOfSecurity}</td>
                  <td colSpan={3}>{segmentData?.securityClassification}</td>
                  <td colSpan={3}>{segmentData?.dateOfValuation}</td>
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
