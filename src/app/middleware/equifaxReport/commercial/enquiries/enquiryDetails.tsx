export const EnquiryDetails = ({ enquiriesDetails }) => {
  return (
    <>
      <h2>
        <strong>9</strong> Enquiry Details
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <tbody>
          <EnquiryDetailsLabel />
          {Boolean(enquiriesDetails) ? (
            enquiriesDetails?.map((enquiryData) => {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {enquiryData?.Institution ?? "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {enquiryData?.Date ?? "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {enquiryData?.Time ?? "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>N/A</td>
                  <td style={{ textAlign: "center" }}>
                    {enquiryData?.Amount ?? "-"}
                  </td>
                </tr>
              );
            })
          ) : (
            <td colSpan={12}>No data found</td>
          )}
        </tbody>
      </table>
    </>
  );
};

const EnquiryDetailsLabel = () => {
  return (
    <tr>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Institution</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Date</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Time</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Purpose</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Amount</span>
      </th>
    </tr>
  );
};
