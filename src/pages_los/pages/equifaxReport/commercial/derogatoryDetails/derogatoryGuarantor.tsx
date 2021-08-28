import { DerogatoryLabel } from "./derogatoryLabel";

export const DerogatoryGuarantor = () => {
  return (
    <>
      <h2>
        <strong>5.2</strong>As Guarantor
        <span style={{ float: "right" }}>
          (All amounts mentioned are in INR)
        </span>
      </h2>

      <table className="table borrower-table-sec">
        <DerogatoryLabel />
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
