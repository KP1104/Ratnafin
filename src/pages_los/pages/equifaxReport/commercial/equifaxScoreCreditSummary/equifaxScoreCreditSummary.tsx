import { EquifaxScore } from "./equifaxScores";
import { EquifaxCreditSummary } from "./overallCreditSummary";

export const EquifaxScoreCredit = ({ creditScore, overallCreditSummary }) => {
  return (
    <div className="equifax-sex">
      <h2 style={{ marginBottom: "20px" }}>
        <strong>1</strong> Equifax Scores & Credit Summary
      </h2>
      <EquifaxScore creditScoreDetails={creditScore} />
      <EquifaxCreditSummary overallCreditSummary={overallCreditSummary} />

      <p style={{ fontStyle: "italic" }}>
        *At FY-end or current date,whichever is earlier
      </p>
    </div>
  );
};
