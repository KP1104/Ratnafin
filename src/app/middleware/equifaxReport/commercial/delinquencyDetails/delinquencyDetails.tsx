import { DelinquencyBorrower } from "./delinquencyBorrower";
import { DelinquencyGuarantor } from "./delinquencyGuarantor";
import { GurantorRelatedIndividuals } from "./guarantorRelatedIndi";

export const DelinquencyDetails = ({ delinquencyDetails }) => {
  return (
    <>
      <DelinquencyBorrower
        borrowerDelinquency={delinquencyDetails?.AsBorrower}
      />
      <DelinquencyGuarantor
        guarantorDelinquency={delinquencyDetails?.AsGuarantor}
      />
      <GurantorRelatedIndividuals
        relatedIndDeliquincy={
          delinquencyDetails?.ForGuarantorRelatedEntitiesIndividuals
        }
      />
    </>
  );
};
