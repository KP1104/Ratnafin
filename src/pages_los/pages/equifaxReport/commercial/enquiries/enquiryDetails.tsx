export const EnquiryDetails = ({ enquiriesDetails }) => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>9</strong> Enquiry Details
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <EnquiryDetailsLabel />
        <tbody>
          {enquiriesDetails?.map((enquiryData) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>
                  {enquiryData?.institution ?? "-"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {enquiryData?.date ?? "-"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {enquiryData?.time ?? "-"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {enquiryData?.requestPurpose ?? "-"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {enquiryData?.amount ?? "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const EnquiryDetailsLabel = () => {
  return (
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
  );
};
