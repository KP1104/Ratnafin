import { Entity } from "./entity";

export const EntityNameDetails = ({
  severityGrid,
  creditScore,
  overallCreditSummary,
  entityName,
}) => {
  return (
    <article>
      <Entity
        severityGrid={severityGrid}
        creditScore={creditScore}
        overallCreditSummary={overallCreditSummary}
        entityName={entityName}
      />
    </article>
  );
};
