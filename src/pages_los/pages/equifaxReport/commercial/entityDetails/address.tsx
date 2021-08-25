export const Address = () => {
  return (
    <>
      <h2>Address details</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Type</th>
            <th scope="col">Address</th>
            <th scope="col">District</th>
            <th scope="col">State</th>
            <th scope="col">PIN Code</th>
            <th scope="col">Last Reported Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Registered Office</td>
            <td>H</td>
            <td>Rupnagar</td>
            <td>Punjab</td>
            <td>160055</td>
            <td>31-102019</td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontStyle: "italic" }}>
        ** This information is receved from ROC and varion govt. websites and
        ESCIS doesn't guarantee the accuracy/conrretness of the same.
      </p>
    </>
  );
};
