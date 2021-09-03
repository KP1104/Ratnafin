export const OpenCreditFacilitiesSummaryLabel = () => {
  return (
    <thead className="thead-dark">
      <tr>
        <th scope="col">Lender</th>
        <th scope="col" style={{ textAlign: "center" }}>
          Open CF#
        </th>
        <th scope="col">Delinquent CF#</th>
        <th scope="col">Sanctioned Amount</th>
        <th scope="col">Current Balance</th>
        <th scope="col">Overdue Amount</th>
        <th scope="col">
          CF Opened in Last <br />
          12 Months#
        </th>
        <th scope="col">
          CF Opened in Last 12-48 <br />
          Months#
        </th>
      </tr>
    </thead>
  );
};
