import { EntityNameDetails } from "./commercial/entityNameDetails";
import { EntityDetails } from "./commercial/entityDetails";
import { DerogatoryDetails } from "./commercial/derogatoryDetails";
import { CreditTypeGuarantor } from "./commercial/creditTypeGuarantor";
import { CreditFacilitySummary } from "./commercial/creditFacilitySummary";
import { GlossaryTermsExplanation } from "./commercial/glossaryTermsExplanation";
import { Enquiry } from "./commercial/enquiry";

import "./commercial/style.css";

export const CommercialReport = () => {
  return (
    <>
      <EntityNameDetails />
      <EntityDetails />
      <DerogatoryDetails />
      <CreditTypeGuarantor />
      <CreditFacilitySummary />
      <Enquiry />
      <GlossaryTermsExplanation />
    </>
  );
};
