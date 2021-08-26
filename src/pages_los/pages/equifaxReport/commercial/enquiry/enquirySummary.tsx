export const EnquirySummary = () => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>8</strong> Enquiry Summary
      </h2>
      <table className="table" style={{ border: "solid 1px #dee2e6" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col" colSpan={15} style={{ textAlign: "center" }}>
              Enquiry Summary
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="entity-bro-none">Purpose</td>
            <td className="entity-bro-none">: All</td>
            <td className="entity-bro-none">Total</td>
            <td className="entity-bro-none">: 0</td>
            <td className="entity-bro-none">Past 30 days</td>
            <td className="entity-bro-none">: 0</td>
          </tr>
          <tr>
            <td className="entity-bro-none">Past 12 Months</td>
            <td className="entity-bro-none">: 0</td>
            <td className="entity-bro-none">Past 24 Months</td>
            <td className="entity-bro-none">: 0</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
