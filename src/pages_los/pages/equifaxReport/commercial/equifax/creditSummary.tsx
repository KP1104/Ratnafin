export const EquifaxCreditSummary = () => {
  return (
    <>
      <h2>
        <strong>1.2</strong> Overall Credit Summary
      </h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col" colSpan={2}></th>
            <th scope="col" colSpan={2}>
              2019-2020
            </th>
            <th scope="col" colSpan={2}>
              2018-2019
            </th>
            <th scope="col" colSpan={2}>
              2017-2018
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}></td>
            <td>As Borrower</td>
            <td>As Guarantor</td>
            <td>As Borrower</td>
            <td>As Guarantor</td>
            <td>As Borrower</td>
            <td>As Guarantor</td>
          </tr>
          <tr>
            <td colSpan={2}>Number of Creadit Facilities(CF)</td>
            <td style={{ textAlign: "center" }}>27</td>
            <td style={{ textAlign: "center" }}>2</td>
            <td style={{ textAlign: "center" }}>27</td>
            <td style={{ textAlign: "center" }}>2</td>
            <td style={{ textAlign: "center" }}>24</td>
            <td style={{ textAlign: "center" }}>2</td>
          </tr>
          <tr>
            <td colSpan={2}>Number of Open Creadit Facilities*</td>
            <td style={{ textAlign: "center" }}>22</td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>22</td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>21</td>
            <td style={{ textAlign: "center" }}>2</td>
          </tr>

          <tr>
            <td colSpan={2}>Number of Closed Term Loans'</td>
            <td style={{ textAlign: "center" }}>4</td>
            <td style={{ textAlign: "center" }}>2</td>
            <td style={{ textAlign: "center" }}>4</td>
            <td style={{ textAlign: "center" }}>2</td>
            <td style={{ textAlign: "center" }}>2</td>
            <td style={{ textAlign: "center" }}>2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
