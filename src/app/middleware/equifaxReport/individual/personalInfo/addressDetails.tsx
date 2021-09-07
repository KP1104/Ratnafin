export const AddressDetails = ({ addressDetails }) => {
  return (
    <div className="consumer-part">
      <h2>Consumer Address:</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Address</th>
            <th scope="col">State</th>
            <th scope="col">Postal</th>
            <th scope="col">Date Reported</th>
          </tr>
        </thead>
        <tbody>
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
