export const Address = ({ addressDetails }) => {
  return (
    <>
      <h2 style={{ borderBottom: "solid 1px" }}>Address details</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">Sr.No.</span>
            </th>
            <th scope="col">
              <span className="heading-color">Type</span>
            </th>
            <th scope="col">
              <span className="heading-color">Address</span>
            </th>
            <th scope="col">
              <span className="heading-color">District</span>
            </th>
            <th scope="col">
              <span className="heading-color">State</span>
            </th>
            <th scope="col">
              <span className="heading-color">PIN Code</span>
            </th>
            <th scope="col">
              <span className="heading-color">Last Reported Date</span>
            </th>
          </tr>
          {Array.isArray(addressDetails) && addressDetails.length > 0 ? (
            addressDetails?.map((addressInfo, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{addressInfo?.type ?? "-"}</td>
                  <td style={{ width: "34%" }}>
                    {addressInfo?.address ?? "-"}
                  </td>
                  <td>{addressInfo?.district ?? "-"}</td>
                  <td>{addressInfo?.state ?? "-"}</td>
                  <td>{addressInfo?.postal ?? "-"}</td>
                  <td>{addressInfo?.reportedDate ?? "-"}</td>
                </tr>
              );
            })
          ) : (
            <td colSpan={12}>No data found</td>
          )}
        </tbody>
      </table>
      <p style={{ fontStyle: "italic" }}>
        ** This information is receved from ROC and varion govt. websites and
        ESCIS doesn't guarantee the accuracy/conrretness of the same.
      </p>
    </>
  );
};
