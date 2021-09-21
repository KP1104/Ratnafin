export const AddressDetails = ({ addressDetails }) => {
  return (
    <div className="consumer-part">
      <h2>Consumer Address:</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">Type</span>
            </th>
            <th scope="col">
              <span className="heading-color">Address</span>
            </th>
            <th scope="col">
              <span className="heading-color">State</span>
            </th>
            <th scope="col">
              <span className="heading-color">Postal</span>
            </th>
            <th scope="col">
              <span className="heading-color">Date Reported</span>
            </th>
          </tr>
          {addressDetails?.map((addressInfo) => {
            return (
              <tr>
                <td>{addressInfo?.type ?? "-"}</td>
                <td>
                  <span className="consumer-half">{addressInfo?.address}</span>
                </td>
                <td>{addressInfo?.state}</td>
                <td>{addressInfo?.postal}</td>
                <td>{addressInfo?.reportedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
