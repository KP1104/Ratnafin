export const EquifaxCreditSummary = ({ overallCreditSummary = {} }: any) => {
  const asBorrower = overallCreditSummary?.AsBorrower ?? {};
  const asGuarantor = overallCreditSummary?.AsGuarantor ?? {};
  const years = Object.keys(asBorrower);

  return (
    <>
      <h2>
        <strong>1.2</strong> Overall Credit Summary
      </h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col" colSpan={2}>
              <span className="heading-color">&nbsp;</span>
            </th>
            {years.map((year) => {
              return (
                <>
                  <th scope="col" colSpan={2}>
                    <span className="heading-color">{year}</span>
                  </th>
                </>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td>As Borrower</td>
            <td>As Guarantor</td>
            <td>As Borrower</td>
            <td>As Guarantor</td>
            <td>As Borrower</td>
            <td>As Guarantor</td>
          </tr>
          <CreditSummaryLine
            accessor="CF_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Credit Facilities(CF)"
            years={years}
          />
          <CreditSummaryLine
            accessor="OpenCF_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Open Credit Facilities*"
            years={years}
          />
          <CreditSummaryLine
            accessor="ClosedTermLoans_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Closed Term Loan*"
            years={years}
          />
          <CreditSummaryLine
            accessor="Lenders_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Lenders"
            years={years}
          />
          <CreditSummaryLine
            accessor="SanctionedAmtOpenCF_Sum"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Sanctioned Amount of Open Credit Facilities*"
            years={years}
          />
          <CreditSummaryLine
            accessor="CurrentBalanceOpenCF_Sum"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Current Balance of Open Credit Facilities*"
            years={years}
          />
          <CreditSummaryLine
            accessor="OverdueCF_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Overdue Credit Facilities*"
            years={years}
          />
          <CreditSummaryLine
            accessor="OverdueCFInFY_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Overdue Credit Facilities during the FY"
            years={years}
          />
          <CreditSummaryLine
            accessor="MonthsOverdue_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Months Overdue"
            years={years}
          />
          <CreditSummaryLine
            accessor="OverdueAmt_Sum"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Overdue Amount*"
            years={years}
          />
          <CreditSummaryLine
            accessor="HighestOverdueAmt"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Highest Overdue Amount"
            years={years}
          />
          <CreditSummaryLine
            accessor="CF_SMA_0_1_2_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Credit Facilities SMA 0/1/2"
            years={years}
          />
          <CreditSummaryLine
            accessor="Months_SMA_0_1_2_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Months SMA 0/1/2"
            years={years}
          />
          <CreditSummaryLine
            accessor="CF_1_30_31_60_61_90_DPD_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Credit Facilities 1-30/31-60/61-90 DPD"
            years={years}
          />
          <CreditSummaryLine
            accessor="Months_1_30_31_60_61_90_DPD_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Months 1-30/31-60/61-90 DPD"
            years={years}
          />
          <CreditSummaryLine
            accessor="CF_90_180_180PLUS_DPD_SRDL_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Credit Facilities 91-180 DPD/180+DPD/
            Substandard/ Restructured/ Doubtful/ Loss"
            years={years}
          />
          <CreditSummaryLine
            accessor="Months_90_180_180PLUS_DPD_SRDL_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Months 91-180 DPD/180+DPD/ Substandard/
            Restructured/ Doubtful/ Loss"
            years={years}
          />
          <CreditSummaryLine
            accessor="HighestOverdueAmt_90_180_180PLUS_DPD_SRDL"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Highest Overdue Amount _ 91-180 DPD/180+DPD/ Substandard/
            Restructured/ Doubtful/ Loss"
            years={years}
          />
          <CreditSummaryLine
            accessor="CF_Wilful_Invoked_Devolved_DC_COff_Settled_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Credit Facilities Wilful-default/ Invoked
            /Devolved / Dishonoured chq / Charge-off/ Settled"
            years={years}
          />
          <CreditSummaryLine
            accessor="ZeroBalanceCF_Count"
            borrower={asBorrower}
            gurantor={asGuarantor}
            label="Number of Zero Balance Credit Facilities*"
            years={years}
          />
        </tbody>
      </table>
    </>
  );
};

const CreditSummaryLine = ({ accessor, borrower, gurantor, label, years }) => {
  return (
    <tr>
      <td colSpan={2}>{label}</td>
      {years.map((year) => (
        <>
          <td style={{ textAlign: "center" }}>
            {borrower[year]?.[accessor] ?? "-"}
          </td>
          <td style={{ textAlign: "center" }}>
            {gurantor[year]?.[accessor] ?? "-"}
          </td>
        </>
      ))}
    </tr>
  );
};
