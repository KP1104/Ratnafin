export const OpenCreditFacilitiesSummaryLabel = () => {
  return (
    <tr>
      <th scope="col">
        <span className="heading-color">Lender</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">
          Open CF#
          <br />
        </span>
      </th>
      <th scope="col">
        <span className="heading-color">Delinquent CF#</span>
      </th>
      <th scope="col">
        <span className="heading-color">Sanctioned Amount</span>
      </th>
      <th scope="col">
        <span className="heading-color">Current Balance</span>
      </th>
      <th scope="col">
        <span className="heading-color">Overdue Amount</span>
      </th>
      <th scope="col">
        <span className="heading-color">CF Opened in Last 12 Months#</span>
      </th>
      <th scope="col">
        <span className="heading-color">CF Opened in Last 12-48 Months#</span>
      </th>
    </tr>
  );
};
