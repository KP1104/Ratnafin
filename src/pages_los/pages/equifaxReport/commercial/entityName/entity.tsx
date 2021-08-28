import { EntityYearWiseDesc } from "./entityYearWiseDesc";
import { EquifaxScoreCredit } from "../equifaxScoreCreditSummary";

export const Entity = ({ severityGrid, creditScore, overallCreditSummary }) => {
  return (
    <div className="middle-top-part-sec">
      <EntityNameLabel />
      <hr />
      <EntityYearWiseDesc severityGrid={severityGrid} />
      <EquifaxScoreCredit
        creditScore={creditScore}
        overallCreditSummary={overallCreditSummary}
      />
    </div>
  );
};

export const EntityNameLabel = () => {
  return (
    <div className="entity-part">
      <ul>
        <li>
          <strong>Entity Name : </strong>
        </li>
        <li>(Last updated on:)</li>
      </ul>
    </div>
  );
};
