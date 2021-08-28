export const EquifaxScore = ({ creditScoreDetails }) => {
  return (
    <>
      <h2>
        <strong>1.1</strong> Equifax Scores
      </h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Score Name</th>
            <th scope="col">Name of Scored Individual or Scored Entity</th>
            <th scope="col">Relationship</th>
            <th scope="col">Score Value</th>
            <th scope="col">Exclusion Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.scoreName}
            </td>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.scoredEntity}
            </td>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.relationship}
            </td>
            <td style={{ textAlign: "center" }}>
              {creditScoreDetails?.scoreValue}
            </td>
            <td style={{ textAlign: "center" }}>{}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
