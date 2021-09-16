export const RelatedEntity = ({ relatedEntity }) => {
  return (
    <>
      <h2 style={{ borderBottom: "solid 1px" }}>2.2 Related Entity(ies)</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">Sr.No</span>
            </th>
            <th scope="col">
              <span className="heading-color">Relationship</span>
            </th>
            <th scope="col">
              <span className="heading-color">Name</span>
            </th>
            <th scope="col">
              <span className="heading-color">Address</span>
            </th>
            <th scope="col">
              <span className="heading-color">Date Of Inc.</span>
            </th>
            <th scope="col">
              <span className="heading-color">CIN</span>
            </th>
            <th scope="col">
              <span className="heading-color">TIN</span>
            </th>
            <th scope="col">
              <span className="heading-color">PAN</span>
            </th>
          </tr>
          <tr>
            {Array.isArray(relatedEntity) && Boolean(relatedEntity)
              ? relatedEntity.map((data, index) => (
                  <>
                    <td>{index + 1}</td>
                    <td>{data?.Relationship ?? "-"}</td>
                    <td>{data?.business_entity_name ?? "-"}</td>
                    <td>{data?.CommercialAddressInfo[0]?.Address}</td>
                    <td>{data?.date_of_incorporation ?? "-"}</td>
                    <td>{data?.CIN ?? "-"}</td>
                    <td>{data?.TIN ?? "-"}</td>
                    <td>{data?.PANId ?? "-"}</td>
                  </>
                ))
              : null}
          </tr>
        </tbody>
      </table>
    </>
  );
};
