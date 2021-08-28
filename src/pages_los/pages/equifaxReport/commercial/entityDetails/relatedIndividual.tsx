export const RelatedIndividuals = ({ individualDetails }) => {
  return (
    <>
      <h2>2.1 Related Individual(s)</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Relationship</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">IDs</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {typeof individualDetails === "object" && Boolean(individualDetails)
              ? Object.keys(individualDetails).map((key, index) => (
                  <>
                    <td>{index + 1}</td>
                    <td>{individualDetails[key]}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </>
                ))
              : null}
          </tr>
          <tr>
            <td>Not coming from DB</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
