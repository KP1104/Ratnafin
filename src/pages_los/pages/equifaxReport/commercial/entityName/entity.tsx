import { EntityYearWiseDesc } from "./entityYearWiseDesc";
import { EquifaxScoreCredit } from "../equifaxScoreCreditSummary";

export const Entity = ({
  severityGrid,
  creditScore,
  overallCreditSummary,
  entityName,
}) => {
  return (
    <div className="middle-top-part-sec">
      <EntityNameLabel entityName={entityName} />
      <hr />
      <EntityYearWiseDesc severityGrid={severityGrid} />
      <EquifaxScoreCredit
        creditScore={creditScore}
        overallCreditSummary={overallCreditSummary}
      />
    </div>
  );
};

export const EntityNameLabel = ({ entityName }) => {
  return (
    <div className="entity-part">
      <ul>
        <li>
          <strong>Entity Name : {entityName} </strong>
        </li>
        <li></li>
      </ul>
    </div>
  );
};
