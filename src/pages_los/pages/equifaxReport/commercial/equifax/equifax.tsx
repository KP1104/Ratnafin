import { EquifaxCreditSummary } from "./creditSummary";

export const EquifaxScoreCredit = () => {
  return (
    <div className="equifax-sex">
      <h2 style={{ marginBottom: "20px" }}>
        <strong>1</strong> Equifax Scores & Creadit Summary
      </h2>
      <h2>
        <strong>1.1</strong> Equifax Scores & Creadit Summary
      </h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Score Name</th>
            <th scope="col">Name of Scored Individual or Scored Entity</th>
            <th scope="col">Reletionship</th>
            <th scope="col">Score Value</th>
            <th scope="col">Exclusion Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <EquifaxCreditSummary />

      <p style={{ fontStyle: "italic" }}>
        *At FY-end or current date,whichever is earlier
      </p>
    </div>
  );
};
