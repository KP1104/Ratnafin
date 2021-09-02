import { Entity } from "./entity";
import { Header } from "../header";

export const EntityNameDetails = ({
  header,
  severityGrid,
  creditScore,
  overallCreditSummary,
  entityName,
}) => {
  return (
    <article id="cover">
      <Header header={header} />
      <hr />
      <Entity
        severityGrid={severityGrid}
        creditScore={creditScore}
        overallCreditSummary={overallCreditSummary}
        entityName={entityName}
      />
    </article>
  );
};
