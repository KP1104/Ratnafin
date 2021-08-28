import { Header } from "../header";
import { EntityPersonalnfo } from "./entityInformation";
import { DelinquencyDetails } from "../delinquencyDetails";

export const EntityDetails = ({
  header,
  entityDetails,
  openCreditFacility,
  delinquencySummary,
}) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <EntityPersonalnfo
        info={entityDetails}
        openCreditFcility={openCreditFacility}
      />
      <hr />
      <div className="entity-details-borrower-sec">
        <DelinquencyDetails delinquencyDetails={delinquencySummary} />
      </div>
    </article>
  );
};
