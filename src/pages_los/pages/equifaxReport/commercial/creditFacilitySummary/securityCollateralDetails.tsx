export const SecurityCollateralDetails = () => {
  return (
    <tr>
      <table className="table borrower-table-sec">
        <thead className="thead-dark">
          <tr>
            <th
              scope="col"
              colSpan={15}
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              Security/Colletral Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colspan="15"
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Security/Collateral Data
            </td>
          </tr>
        </tbody>
      </table>
    </tr>
  );
};
