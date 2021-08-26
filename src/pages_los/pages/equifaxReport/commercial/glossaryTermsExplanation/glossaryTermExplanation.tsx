import { Header } from "../header";

export const GlossaryTermsExplanation = ({ header }) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <div className="entity-details-borrower-sec">
        <h2 style={{ marginBottom: "20px" }}>
          <strong>12</strong>Glossary, Tearm and Explanations:
        </h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                Code
              </th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>000</td>
              <td>Current account</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CLSD</td>
              <td>Paid or closed account/zero balance</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>NEW</td>
              <td>New Account</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>LNSB</td>
              <td>Loan Submitted</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>LAND</td>
              <td>Loan Approved - Not yet disbursed</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>INAC</td>
              <td>Account is Inactive</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CON</td>
              <td>Contact Member for Status</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>DEC</td>
              <td>Loan Declined</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>60+</td>
              <td>60-89 days past due </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SPM</td>
              <td>Special Mention</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SUB</td>
              <td>Sub-standard</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>RES</td>
              <td>Restructured Loan</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>RGM</td>
              <td>Restructured Loan - Govt Mandate</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>RNC</td>
              <td>Restructured Loan - Natural Calamity</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SET </td>
              <td>Settled </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SF</td>
              <td>Suit Filed</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>90+</td>
              <td>90-119 days past due</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>120+</td>
              <td>120-179 days past due</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>180+</td>
              <td> 180-359 days past due</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>360+</td>
              <td>360-539 days past due</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>540+</td>
              <td>540-719 days past due</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>720+</td>
              <td> 720 or more days past due</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>DBT</td>
              <td>Doubtful</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>FPD</td>
              <td>First Payment Default</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>WDF</td>
              <td>Willful Default</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>PWOS</td>
              <td>Post Written Off Settled</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>WOF</td>
              <td>Charge Off/Written Off</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Non-Delnqt</td>
              <td>Non-Delinquent</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>STD</td>
              <td>Standard</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SUB</td>
              <td>Sub-standard</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>LOSS</td>
              <td>Loss</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SPM</td>
              <td>Special Mention Account</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SFR</td>
              <td>Suit Filed-Restructured</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>SFWD</td>
              <td>Suit Filed-Willful Default</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
    </article>
  );
};
