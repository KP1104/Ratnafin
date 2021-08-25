import { DelinquencyBorrower } from "./delinquencyBorrower";
import { DelinquencyGuarantor } from "./delinquencyGuarantor";
import { GurantorRelatedIndividuals } from "./guarantorRelatedIndi";

export const DelinquencyDetails = () => {
  return (
    <>
      <DelinquencyBorrower />
      <DelinquencyGuarantor />
      <GurantorRelatedIndividuals />
    </>
  );
};
