export const DishonouredChequeDetails = () => {
  return (
    <tr>
      <table className="table borrower-table-sec" style={{ marginBottom: "0" }}>
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
              Dishonored Cheque Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={15}
              style={{
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Dishonoured Cheque Date
            </td>
          </tr>
        </tbody>
      </table>
    </tr>
  );
};
