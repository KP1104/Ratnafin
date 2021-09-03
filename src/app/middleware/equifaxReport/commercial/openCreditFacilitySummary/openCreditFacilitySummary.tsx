import { BorrowerCreditFacility } from "./asBorrower";
import { GuarantorCreditFacility } from "./asGuarantor";

export const CreditFacility = ({ openCreditFcility }) => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>3</strong> Open Credit Facilities (CF) Summary
      </h2>
      <BorrowerCreditFacility asBorrower={openCreditFcility?.AsBorrower} />
      <GuarantorCreditFacility asGuarantor={openCreditFcility?.AsGuarantor} />
    </>
  );
};
