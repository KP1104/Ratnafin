export const DishonouredChequeDetails = ({ dishounouredDetails }) => {
  return (
    <tr>
      <td
        colSpan={15}
        style={{ padding: 0 }}
        className="borrower-table-bro-one"
      >
        <table className="table borrower-table-sec" style={{ marginBottom: 0 }}>
          <tr>
            <th scope="col" colSpan={15} className="align-center-sec">
              <span className="heading-color">Dishonored Cheque Details</span>
            </th>
          </tr>
          <tr>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Sr.No</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color"> Amount</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Reason of Dishonor</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">No. of Times Dishonored</span>
            </th>
            <th colSpan={3} className="align-center-sec">
              <span className="heading-color">Date of Dishonor</span>
            </th>
          </tr>
          <tbody>
            {Array.isArray(dishounouredDetails) &&
            Boolean(dishounouredDetails) ? (
              dishounouredDetails.map((dishounouredData, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{dishounouredData?.Amount ?? "-"} </td>
                  <td>{dishounouredData?.ReasonForDishonour ?? "-"} </td>
                  <td>{dishounouredData?.NumberOfTimesDishonoured ?? "-"}</td>
                  <td>{dishounouredData?.DateOfDishonour ?? "-"} </td>
                </tr>
              ))
            ) : (
              <td colSpan={15} className="align-center-sec">
                No Dishonoured Cheque Data
              </td>
            )}
          </tbody>
        </table>
      </td>
    </tr>
  );
};
