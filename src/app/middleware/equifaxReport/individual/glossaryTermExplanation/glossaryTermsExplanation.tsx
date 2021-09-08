import { Header } from "../header";
import { Footer } from "../footer";

export const GlossaryTermsExplanation = ({ header }) => {
  return (
    <article id="competences">
      <Header headerDetails={header} />
      <hr />

      <div className="glossary-part">
        <h2>Glossary, Terms and Explanations:</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>000</td>
              <td>current account</td>
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
              <td>01+</td>
              <td>1-29 days past due</td>
            </tr>
            <tr>
              <td>30+</td>
              <td>30-59 days past due</td>
            </tr>
            <tr>
              <td>DEC</td>
              <td>Loan Declined</td>
            </tr>
            <tr>
              <td>60+</td>
              <td>60-89 days past due </td>
            </tr>
            <tr>
              <td>SPM</td>
              <td>Special Mention</td>
            </tr>
            <tr>
              <td>SUB</td>
              <td>Sub-standard</td>
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
              <td>SET </td>
              <td>Settled </td>
            </tr>
            <tr>
              <td>SF</td>
              <td>Suit Filed</td>
            </tr>
            <tr>
              <td>90+</td>
              <td>90-119 days past due</td>
            </tr>
            <tr>
              <td>120+</td>
              <td>120-179 days past due</td>
            </tr>
            <tr>
              <td>180+</td>
              <td> 180-359 days past due</td>
            </tr>
            <tr>
              <td>360+</td>
              <td>360-539 days past due</td>
            </tr>
            <tr>
              <td>540+</td>
              <td>540-719 days past due</td>
            </tr>
            <tr>
              <td>720+</td>
              <td> 720 or more days past due</td>
            </tr>
            <tr>
              <td>DBT</td>
              <td>Doubtful</td>
            </tr>
            <tr>
              <td>FPD</td>
              <td>First Payment Default</td>
            </tr>
            <tr>
              <td>WDF</td>
              <td>Willful Default</td>
            </tr>
            <tr>
              <td>PWOS</td>
              <td>Post Written Off Settled</td>
            </tr>
            <tr>
              <td>WOF</td>
              <td>Charge Off/Written Off</td>
            </tr>
            <tr>
              <td>Non-Delnqt</td>
              <td>Non-Delinquent</td>
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
              <td>LOSS</td>
              <td>Loss</td>
            </tr>
            <tr>
              <td>SPM</td>
              <td>Special Mention Account</td>
            </tr>
            <tr>
              <td>SFR</td>
              <td>Suit Filed-Restructured</td>
            </tr>
            <tr>
              <td>SFWD</td>
              <td>Suit Filed-Willful Default</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Footer />
    </article>
  );
};
