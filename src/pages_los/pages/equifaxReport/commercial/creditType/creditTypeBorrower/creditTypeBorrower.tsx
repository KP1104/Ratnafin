import { CreditTypeSummary } from "./asBorrower";

export const CreditType = ({ creditTypeSummary }) => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>6</strong>Credit Type Summary
      </h2>
      <CreditTypeSummary
        label="As Borrower"
        onData={creditTypeSummary?.AsBorrowerOnMember}
        offData={creditTypeSummary?.AsBorrowerOffMember}
        sequence={6.1}
      />
      <CreditTypeSummary
        label="As Guarantor"
        onData={creditTypeSummary?.AsGuarantorOnMember}
        offData={creditTypeSummary?.AsGuarantorOffMember}
        sequence={6.2}
      />
    </>
  );
};
