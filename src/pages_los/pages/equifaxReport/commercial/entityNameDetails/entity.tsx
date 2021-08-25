import { EntityYearWiseDesc } from "./entityYearWiseDesc";
import { EntityName } from "./entityName";
import { EquifaxScoreCredit } from "../equifax";

export const Entity = () => {
  return (
    <div className="middle-top-part-sec">
      <EntityName />
      <hr />
      <EntityYearWiseDesc />
      <EquifaxScoreCredit />
    </div>
  );
};
