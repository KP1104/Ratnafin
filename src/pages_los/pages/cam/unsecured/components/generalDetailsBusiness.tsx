import {
  Default,
  DateFormat,
  Address,
  Amount,
  Percentage,
} from "pages_los/pages/cam/components";
import { PromoterDetails } from "./promoterDetail";

export const GeneralDetailsBusiness = ({ general, promoter, address }) => {
  if (typeof general === "object") {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            value="General Details"
            className="form-heading"
            element="th"
            align="center"
          />
        </tr>
        <tr>
          <Default colspan={2} value="Name of the Unit" element="th" />
          <Default colspan={7} value={general?.entityName} />
        </tr>
        <tr>
          <Default colspan={2} value="Constitution of Business" element="th" />
          <Default colspan={7} value={general?.entityType} />
        </tr>
        <tr>
          <Default colspan={2} value="Credit Score" element="th" />
          <Default colspan={7} value={general?.creditScore} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Ownership of Factory / Business Premises"
            element="th"
          />
          <Default colspan={7} value={general?.ownershipType} />
        </tr>
        <tr>
          <Default colspan={2} value="Date of incorporation" element="th" />
          <DateFormat colspan={7} value={general?.incorporationDate} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Nature of Existing Business"
            element="th"
          />
          <Default colspan={7} value={general?.businessNature} />
        </tr>
        <tr>
          <Default colspan={2} value="Existing Type of Industry" element="th" />
          <Default colspan={7} value={general?.typeOfIndustry} />
        </tr>
        <tr>
          <Default colspan={2} value="Proposed business" element="th" />
          <Default colspan={7} value={general?.businessProposed} />
        </tr>
        <tr>
          <Default colspan={2} value="External credit rating" element="th" />
          <Default colspan={7} value={general?.rankExternal} />
        </tr>
        <tr>
          <Default colspan={2} value="MSME" element="th" />
          <Default colspan={7} value={general?.businessSize} />
        </tr>
        <tr>
          <Default colspan={2} value="PAN No" element="th" />
          <Default colspan={7} value={general?.panNumber} />
        </tr>
        <tr>
          <Default colspan={2} value="Udhyog Aadhar No" element="th" />
          <Default colspan={7} value={general?.udhyogNumber} />
        </tr>
        <tr>
          <Default colspan={2} value="CMR Ranking" element="th" />
          <Default colspan={7} value={general?.crmRank} />
        </tr>
        <tr>
          <Default colspan={2} value="Purpose of loan" element="th" />
          <Default colspan={7} value={general?.purposeLoan} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Last 12 Months average Bank Balance"
            element="th"
          />
          <Amount colspan={7} value={general?.averageBankBal} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Average Utilisation of Working Capital Limits"
            element="th"
          />
          <Amount colspan={7} value={general?.limitBal} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Credit Summation in Bank in Last 12 months"
            element="th"
          />
          <Default colspan={7} value={general?.chequeBounces} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Inward cheque bounces, if any and % of total Cheque bounce"
            element="th"
          />
          <Percentage colspan={7} value={general?.chequeBounces} />
        </tr>

        <Address value={address} />
        <PromoterDetails promoter={promoter} />
      </>
    );
  }
  return null;
};
