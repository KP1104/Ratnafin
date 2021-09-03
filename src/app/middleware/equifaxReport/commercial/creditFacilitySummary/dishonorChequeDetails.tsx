export const DishonouredChequeDetails = () => {
  return (
    <tr>
      <td
        colSpan={15}
        style={{ padding: 0 }}
        className="borrower-table-bro-one"
      >
        <table className="table borrower-table-sec" style={{ marginBottom: 0 }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col" colSpan={15} className="align-center-sec">
                Dishonored Cheque Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={15} className="align-center-sec">
                No Dishonoured Cheque Date
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};
