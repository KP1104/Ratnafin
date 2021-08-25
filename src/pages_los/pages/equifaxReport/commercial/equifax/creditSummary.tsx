export const EquifaxCreditSummary = () => {
  return (
    <>
      <h2>
        <strong>1.2</strong> Overall Ceardit Summary
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
            <td>27</td>
            <td>2</td>
            <td>27</td>
            <td>2</td>
            <td>24</td>
            <td>2</td>
          </tr>
          <tr>
            <td colSpan={2}>Number of Open Creadit Facilities*</td>
            <td>22</td>
            <td></td>
            <td>22</td>
            <td></td>
            <td>21</td>
            <td>2</td>
          </tr>

          <tr>
            <td colSpan={2}>Number of Closed Term Loans'</td>
            <td>4</td>
            <td>2</td>
            <td>4</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
