export const EquifaxScore = ({ scoreDetails }) => {
  return (
    <div className="equifax-sec">
      <h2>Equifax Score(s):</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">Score Name</span>
            </th>
            <th scope="col">
              <span className="heading-color">Score</span>
            </th>
            <th scope="col">
              <span className="heading-color">Scoring Elements</span>
            </th>
            <th scope="col">
              <span className="heading-color">Score Description</span>
            </th>
          </tr>
          <tr>
            <td>{scoreDetails?.scoreName}</td>
            <td>
              <strong>{scoreDetails?.scoreValue}</strong>
            </td>
            <td>
              1. Delinquency or past due amount occurences
              <br />
              2. Number of trades
              <br />
              3. Past due amount of trades
            </td>
            <td>{scoreDetails?.scoreDescription}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
