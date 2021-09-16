import { OpenCreditFacilitiesSummaryLabel } from "./openCreditFacilitySummaryLabel";
export const GuarantorCreditFacility = ({ asGuarantor }) => {
  return (
    <>
      <h2>
        <strong>3.2</strong> As Guarantor
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec">
        <tbody>
          <OpenCreditFacilitiesSummaryLabel />
          {typeof asGuarantor === "object" && Boolean(asGuarantor)
            ? Object.keys(asGuarantor).map((key, i) => {
                return (
                  <tr>
                    <td>
                      {key.split("Off-Member ") || key.split("On-Member ")}
                    </td>
                    <td>{asGuarantor[key]?.OpenCF_Count}</td>
                    <td>{asGuarantor[key]?.OverdueCF_Count}</td>
                    <td>{asGuarantor[key]?.SanctionedAmount_Sum}</td>
                    <td>{asGuarantor[key]?.CurrentBalance_Sum}</td>
                    <td>{asGuarantor[key]?.OverdueAmount_Sum}</td>
                    <td>{asGuarantor[key]?.CF_Opened_Lst_12_Months_Count}</td>
                    <td>
                      {asGuarantor[key]?.CF_Opened_Lst_12To48_Months_Count}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
};
