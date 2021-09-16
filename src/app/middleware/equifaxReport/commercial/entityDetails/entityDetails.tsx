import { EntityPersonalnfo } from "./entityInformation";

export const EntityDetails = ({ entityDetails, openCreditFacility }) => {
  return (
    <article>
      <EntityPersonalnfo
        info={entityDetails}
        openCreditFcility={openCreditFacility}
      />
    </article>
  );
};
