export const RelatedIndividuals = ({ individualDetails }: any) => {
  return (
    <>
      <h2 style={{ borderBottom: "solid 1px" }}>2.1 Related Individual(s)</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">Sr.No.</span>
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
              <span className="heading-color">IDs</span>
            </th>
            <th scope="col">
              <span className="heading-color">Phone</span>
            </th>
          </tr>
          {Array.isArray(individualDetails) && Boolean(individualDetails) ? (
            individualDetails.map((individualData, index) => {
              return (
                <tr>
                  <td> {index + 1} </td>
                  <td>{individualData?.Relationship}</td>
                  <td style={{ width: "20%" }}>{individualData?.full_name} </td>
                  <td style={{ width: "20%" }}>
                    {individualData?.CommercialAddressInfo[0]?.Address ?? "-"}
                  </td>
                  <DisplayIDsAndPhones
                    idsAndPhoneData={individualData?.IdentityInfo}
                  />
                  <DisplayIDsAndPhones
                    idsAndPhoneData={individualData?.PhoneInfo}
                  />
                </tr>
              );
            })
          ) : (
            <td>No Data found</td>
          )}
        </tbody>
      </table>
    </>
  );
};

const DisplayIDsAndPhones = ({ idsAndPhoneData }) => {
  const contactInfo: any = [];
  let entries = Object.entries(idsAndPhoneData);
  for (var i = 0; i < entries.length; i++) {
    if (Boolean(entries[i][1])) {
      let newLabel = "";
      switch (entries[i][0]) {
        case "PANId":
          newLabel = "PAN";
          break;
        case "NationalIDCard":
          newLabel = "Nationa ID";
          break;
        default:
          newLabel = entries[i][0];
      }
      contactInfo.push({ label: newLabel, value: entries[i][1] });
    }
  }
  return (
    <td>
      {contactInfo.map((contact) => (
        <tr style={{ border: "hidden" }}>
          <td>
            <b>{contact.label}</b> -{contact.value}
          </td>
        </tr>
      ))}
    </td>
  );
};
