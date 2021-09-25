import { DerogatoryLabel, DerogatoryDetails } from "./derogatoryLabel";

export const DerogatoryGuarantor = ({ guarantorDerogatory }) => {
  const flatMapGuarantors: any = [];
  if (Boolean(guarantorDerogatory)) {
    const allGuarantorsType = Object.keys(guarantorDerogatory);
    for (let i = 0; i < allGuarantorsType.length; i++) {
      for (const one of guarantorDerogatory[allGuarantorsType[i]]) {
        flatMapGuarantors.push({ ...one, source: allGuarantorsType[i] });
      }
    }
  }

  return (
    <>
      <h2>
        <strong>5.2</strong>As Guarantor
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>

      <table className="table borrower-table-sec">
        <tbody>
          <DerogatoryLabel />
          {Array.isArray(flatMapGuarantors) && flatMapGuarantors.length > 0 ? (
            <DerogatoryDetails derogatoryDetails={flatMapGuarantors ?? ""} />
          ) : (
            <td colSpan={12}>No Guarantor Details</td>
          )}
        </tbody>
      </table>
    </>
  );
};
