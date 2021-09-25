export const GlossaryTermsExplanation = () => {
  return (
    <article>
      <div className="entity-details-borrower-sec">
        <h2>
          <strong>12</strong>Glossary, Tearm and Explanations:
        </h2>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                <span className="heading-color">Code</span>
              </th>
              <th scope="col">
                <span className="heading-color">Description</span>
              </th>
            </tr>
            <tr>
              <td>000</td>
              <td>Current account</td>
            </tr>
            <tr>
              <td>CLSD</td>
              <td>Paid or closed account/zero balance</td>
            </tr>
            <tr>
              <td>NEW</td>
              <td>New Account</td>
            </tr>
            <tr>
              <td>LNSB</td>
              <td>Loan Submitted</td>
            </tr>
            <tr>
              <td>LAND</td>
              <td>Loan Approved - Not yet disbursed</td>
            </tr>
            <tr>
              <td>INAC</td>
              <td>Account is Inactive</td>
            </tr>
            <tr>
              <td>CON</td>
              <td>Contact Member for Status</td>
            </tr>
            <tr>
              <td>DEC</td>
              <td>Loan Declined</td>
            </tr>
            <tr>
              <td>01+</td>
              <td>1-30 days past due</td>
            </tr>
            <tr>
              <td>31+</td>
              <td>31-60 days past due</td>
            </tr>
            <tr>
              <td>61+</td>
              <td>61-90 days past due </td>
            </tr>
            <tr>
              <td>91+</td>
              <td>91-120 days past due </td>
            </tr>
            <tr>
              <td>121+</td>
              <td>121-179 days past due </td>
            </tr>
            <tr>
              <td>181+</td>
              <td>180 or more days past due </td>
            </tr>
            <tr>
              <td>STD</td>
              <td>Standard</td>
            </tr>
            <tr>
              <td>SUB</td>
              <td>Sub-standard</td>
            </tr>
            <tr>
              <td>DBT</td>
              <td>Doubtful</td>
            </tr>
            <tr>
              <td>LOS</td>
              <td>Loss</td>
            </tr>
            <tr>
              <td>SMA</td>
              <td>Special Mention Accounts</td>
            </tr>
            <tr>
              <td>SMA 0</td>
              <td>
                Principal or interest payment not overdue for more than 30 days
                but account showing signs of incipient stress
              </td>
            </tr>
            <tr>
              <td>SMA 1</td>
              <td>Principal or interest payment overdue between 31-60 days</td>
            </tr>
            <tr>
              <td>SMA 2</td>
              <td>
                Principal or interest payment overdue between 61-90 days, and NA
                (Not Applicable)
              </td>
            </tr>
            <tr>
              <td>DBT 1</td>
              <td>SMA 2 - Doubtfull -1</td>
            </tr>
            <tr>
              <td>DBT 1</td>
              <td>Doubtfull -1</td>
            </tr>
            <tr>
              <td>DBT 2</td>
              <td>Doubtfull -2</td>
            </tr>
            <tr>
              <td>DBT 3</td>
              <td>Doubtfull -3</td>
            </tr>
            <tr>
              <td>NPA</td>
              <td>Non Performing Assest</td>
            </tr>
            <tr>
              <td>1000</td>
              <td>0 Day Past Due</td>
            </tr>
            <tr>
              <td>1001</td>
              <td>1 Day Past Due</td>
            </tr>
            <tr>
              <td>1002</td>
              <td>2 Day Past Due</td>
            </tr>
            <tr>
              <td>1 nnn</td>
              <td>
                Nnnn Days Past Due <br />
                Note: Nnn is the actual number of days.
                <br />
                E.g., report 1114, if the number of days past due is 114 days.
              </td>
            </tr>
            <tr>
              <td>1999</td>
              <td>999 or above days past due</td>
            </tr>
            <tr>
              <td>OPN</td>
              <td>Open</td>
            </tr>
            <tr>
              <td>CLSD</td>
              <td>Closed</td>
            </tr>
            <tr>
              <td>SET</td>
              <td>Settled & Closed</td>
            </tr>
            <tr>
              <td>WOF</td>
              <td>Written Off</td>
            </tr>
            <tr>
              <td>PWOS</td>
              <td>Post Write Off Settled</td>
            </tr>
            <tr>
              <td>WOF</td>
              <td>Charge Off/Written Off</td>
            </tr>
            <tr>
              <td>INV</td>
              <td>Invoked</td>
            </tr>
            <tr>
              <td>DEV</td>
              <td>Devolved</td>
            </tr>
            <tr>
              <td>RES</td>
              <td>Restructured Loan</td>
            </tr>
            <tr>
              <td>RGM</td>
              <td>Restructured Loan - Govt Mandate</td>
            </tr>
            <tr>
              <td>RNC</td>
              <td>Restructured Loan - Natural Calamity</td>
            </tr>
            <tr>
              <td>NS</td>
              <td>Not a Suit Field Case</td>
            </tr>
            <tr>
              <td>SF</td>
              <td>Suit Field</td>
            </tr>
            <tr>
              <td>WDF</td>
              <td>Willful Default</td>
            </tr>
            <tr>
              <td>SFR</td>
              <td>Suit Filed-Restructured</td>
            </tr>
            <tr>
              <td>SFWD</td>
              <td>Suit Filed-Willful Default</td>
            </tr>
            <tr>
              <td>SFWO</td>
              <td>Suit Filed and Written Off</td>
            </tr>
            <tr>
              <td>WDWO</td>
              <td>Willful Default and Written Off</td>
            </tr>
            <tr>
              <td>SWDW</td>
              <td>Suit Field,Willful Default and Written Off</td>
            </tr>
            <tr>
              <td>FPD</td>
              <td>First Payment Default</td>
            </tr>
            <tr>
              <td>TP</td>
              <td>Trial in Progress</td>
            </tr>
            <tr>
              <td>DI</td>
              <td>Decree issued by court</td>
            </tr>
            <tr>
              <td>ED</td>
              <td>Execution of Degree</td>
            </tr>
            <tr>
              <td>NAOC</td>
              <td>National Amount of Contract</td>
            </tr>
            <tr>
              <td>NAORC</td>
              <td>National Amount of Out-standing Restructured Contract</td>
            </tr>
            <tr>
              <td>WAMPOC</td>
              <td>Weighted Average maturity period of Contract</td>
            </tr>
            <tr>
              <td>.</td>
              <td>Data Not Reported</td>
            </tr>
            <tr>
              <td>DPD</td>
              <td>Days Past Due</td>
            </tr>
            <tr>
              <td>ERS</td>
              <td>Equifax Risk Score</td>
            </tr>
            <tr>
              <td>CF</td>
              <td>Credit Facilities</td>
            </tr>
            <tr>
              <td>FY</td>
              <td>Financial Years</td>
            </tr>
            <tr>
              <td>CIN</td>
              <td>Corporate Identtity Number</td>
            </tr>
            <tr>
              <td>TIN</td>
              <td>Taxpayer Identification Number</td>
            </tr>
            <tr>
              <td>PAN</td>
              <td>Permanent Account Number</td>
            </tr>
            <tr>
              <td>DUNS</td>
              <td>Data Universal Numbering System</td>
            </tr>
            <tr>
              <td>Date of Inc.</td>
              <td>Date of Incorporation</td>
            </tr>
            <tr>
              <td>On-Member</td>
              <td>Your Institution</td>
            </tr>
            <tr>
              <td>Off-Member</td>
              <td>Other Institution</td>
            </tr>
            <tr>
              <td>PSU</td>
              <td>Public Sector Undertaking</td>
            </tr>
            <tr>
              <td>Pv</td>
              <td>Private Limited</td>
            </tr>
            <tr>
              <td>NBFC</td>
              <td>
                Non-Bank Financial Institution/ Non-Banking Financial Company
              </td>
            </tr>
            <tr>
              <td>WC</td>
              <td>Working Capital</td>
            </tr>
            <tr>
              <td>NF</td>
              <td>Non-Funded</td>
            </tr>
            <tr>
              <td>TL</td>
              <td>Term Loan</td>
            </tr>
            <tr>
              <td>FX</td>
              <td>Forex</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};
