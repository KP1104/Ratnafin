import { BorrowerCreditFacility } from "./asBorrower";
import { GuarantorCreditFacility } from "./asGuarantor";

export const CreditFacility = () => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>3</strong> Open Creadit Facilities (CF) Summary
      </h2>
      <BorrowerCreditFacility />
      <GuarantorCreditFacility />
    </>
  );
};
