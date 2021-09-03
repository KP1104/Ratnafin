export const RelatedEntity = ({ relatedEntity }) => {
  return (
    <>
      <h2>2.2 Related Entity(ies)</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Relationship</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Date Of Inc.</th>
            <th scope="col">CIN</th>
            <th scope="col">TIN</th>
            <th scope="col">PAN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {typeof relatedEntity === "object" && Boolean(relatedEntity)
              ? Object.keys(relatedEntity).map((key, index) => (
                  <>
                    <td>{index + 1}</td>
                    <td>{relatedEntity[key]}</td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </>
                ))
              : null}
          </tr>
          <tr>Not coming from DB</tr>
        </tbody>
      </table>
    </>
  );
};
