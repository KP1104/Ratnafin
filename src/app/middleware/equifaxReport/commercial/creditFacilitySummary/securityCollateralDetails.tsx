export const SecurityCollateralDetails = () => {
  return (
    <tr>
      <td
        colSpan={15}
        style={{ padding: 0 }}
        className="borrower-table-bro-one"
      >
        <table className="table borrower-table-sec">
          <thead className="thead-dark">
            <tr>
              <th scope="col" colSpan={15} className="align-center-sec">
                Security/Colletral Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={15} className="align-center-sec">
                No Security/Collateral Data
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};
