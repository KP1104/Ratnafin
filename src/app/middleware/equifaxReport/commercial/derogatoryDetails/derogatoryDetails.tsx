import { DerogatoryBorrower } from "./derogatoryBorrower";
import { DerogatoryGuarantor } from "./derogatoryGuarantor";
import { GuarantorRelatedInd } from "./gurantorRelatedInd";

export const DerogatoryDetails = ({ derogatoryDetails }) => {
  return (
    <article>
      <div className="entity-details-borrower-sec">
        <h2>
          <strong>5</strong>Derogatory Summary
        </h2>
        <DerogatoryBorrower
          borrowerDerogatory={derogatoryDetails?.AsBorrower}
        />
        <DerogatoryGuarantor
          guarantorDerogatory={derogatoryDetails?.AsGuarantor}
        />
        <GuarantorRelatedInd
          relatedIndDerogatory={
            derogatoryDetails?.ForGuarantorRelatedEntitiesIndividuals
          }
        />
      </div>
    </article>
  );
};
