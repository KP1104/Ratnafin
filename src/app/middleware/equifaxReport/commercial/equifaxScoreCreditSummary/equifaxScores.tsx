export const EquifaxScore = ({ creditScoreDetails }) => {
  return (
    <>
      <h2>
        <strong>1.1</strong> Equifax Scores
      </h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">Score Name</span>
            </th>
            <th scope="col">
              <span className="heading-color">
                Name of Scored Individual or Scored Entity
              </span>
            </th>
            <th scope="col">
              <span className="heading-color">Relationship</span>
            </th>
            <th scope="col">
              <span className="heading-color">Score Value</span>
            </th>
            <th scope="col">
              <span className="heading-color">Exclusion Reason</span>
            </th>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.scoreName ?? "-"}
            </td>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.scoredEntity ?? "-"}
            </td>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.relationship ?? "-"}
            </td>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.scoreValue ?? "-"}
            </td>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.exclusionReason ?? "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
