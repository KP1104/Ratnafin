import { OpenCreditFacilitiesSummaryLabel } from "./openCreditFacilitySummaryLabel";
export const BorrowerCreditFacility = ({ asBorrower }) => {
  return (
    <>
      <h2>
        <strong>3.1</strong> As Borrower
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>
      <table className="table borrower-table-sec">
        <tbody>
          <OpenCreditFacilitiesSummaryLabel />
          {typeof asBorrower === "object" && Boolean(asBorrower)
            ? Object.keys(asBorrower).map((key, i) => (
                <tr>
                  <td>{key.split("Off-Member ") || key.split("On-Member ")}</td>
                  <td>{asBorrower[key]?.OpenCF_Count ?? "-"}</td>
                  <td>{asBorrower[key]?.OverdueCF_Count ?? "-"}</td>
                  <td>{asBorrower[key]?.SanctionedAmount_Sum ?? "-"}</td>
                  <td>{asBorrower[key]?.CurrentBalance_Sum ?? "-"}</td>
                  <td>{asBorrower[key]?.OverdueAmount_Sum ?? "-"}</td>
                  <td>
                    {asBorrower[key]?.CF_Opened_Lst_12_Months_Count ?? "-"}
                  </td>
                  <td>
                    {asBorrower[key]?.CF_Opened_Lst_12To48_Months_Count ?? "-"}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};
