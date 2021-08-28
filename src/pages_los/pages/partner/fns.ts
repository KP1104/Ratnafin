import { LOSSDK } from "registry/fns/los";
export const becomePartner = (_, dependentValues) => {
  if (dependentValues?.partnerType?.value === "C") {
    return false;
  }
  return true;
};
export const becomePartnerIndividual = (_, dependentValues) => {
  if (dependentValues?.partnerType?.value === "I") {
    return false;
  }
  return true;
};
export const becomePartnerNominee = (_, dependentValues) => {
  if (
    dependentValues?.nomineeFlag?.value === "Y" &&
    dependentValues?.partnerType?.value === "I"
  ) {
    return false;
  }
  return true;
};
