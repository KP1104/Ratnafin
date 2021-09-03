export const EnquiryInputDetails = ({ enquiryInputDetails = {} }: any) => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>
        <strong>10</strong> Enquiry Input Details
      </h2>
      <table
        className="table"
        style={{
          borderTop: "none",
          border: "solid 1px #dee2e6",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                padding: 0,
                borderTop: "none",
                width: "33%",
                display: "inline-block",
                verticalAlign: "top",
              }}
              className="entity-bro-none"
            >
              <BusinessInfo
                enquiryInputDetails={enquiryInputDetails?.inquiryInfo}
              />
            </td>
            <td
              style={{
                padding: 0,
                borderTop: "none",
                width: "33%",
                display: "inline-block",
                verticalAlign: "top",
                height: "100%",
              }}
              className="entity-bro-none"
            >
              <IdentificationDetails
                identitiyDetails={enquiryInputDetails?.IDDetails}
              />
            </td>
            <td
              style={{
                padding: 0,
                borderTop: "none",
                width: "34%",
                display: "inline-block",
                verticalAlign: "top",
              }}
              className="entity-bro-none"
            >
              <AddressDetails
                addressDetails={enquiryInputDetails?.InquiryAddresses}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const BusinessInfo = ({ enquiryInputDetails }) => {
  return (
    <table className="table" style={{ marginBottom: "0" }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan={3}>
            Company & Inquiry Info
          </th>
        </tr>
      </thead>
      <tbody className="bro-none">
        <tr>
          <td colSpan={2}>Comapny Name :</td>
          <td colSpan={2}>{enquiryInputDetails?.businessName}</td>
        </tr>
        <tr>
          <td colSpan={2}>Company Registation No :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Date Of Incorporation :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Bussiness Category :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Industy Type :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Enquiry Purpose :</td>
          <td colSpan={2}>{enquiryInputDetails?.inquiryPurpose}</td>
        </tr>
        <tr>
          <td colSpan={2}>Enquiry Amount :</td>
          <td colSpan={2}>{enquiryInputDetails?.transactionAmount}</td>
        </tr>
        <tr>
          <td colSpan={2}>DUNS Number :</td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </table>
  );
};

const IdentificationDetails = ({ identitiyDetails }) => {
  return (
    <table className="table" style={{ borderTop: "none", marginBottom: "0" }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan={3}>
            ID & Phone Numbers
          </th>
        </tr>
      </thead>
      <tbody className="bro-none">
        <tr>
          <td colSpan={2}>PAN :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>CIN :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>TIN :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Service Tax No :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Landline :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Mobile :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Fax :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Email :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Email :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Email :</td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </table>
  );
};

const AddressDetails = ({ addressDetails = [] }: any) => {
  return (
    <table className="table" style={{ borderTop: "none", marginBottom: "0" }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan={3}>
            Address Details
          </th>
        </tr>
      </thead>
      <tbody className="bro-none">
        <tr>
          <td colSpan={2}>Address Information | :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Address :</td>
          <td colSpan={2}>
            {addressDetails[0]?.addressLine1} {addressDetails[0]?.addressLine2}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>City :</td>
          <td colSpan={2}>{addressDetails[0]?.city}</td>
        </tr>
        <tr>
          <td colSpan={2}>Postal :</td>
          <td colSpan={2}>{addressDetails[0]?.postal}</td>
        </tr>
        <tr>
          <td colSpan={2}>State :</td>
          <td colSpan={2}>{addressDetails[0]?.state}</td>
        </tr>
        <tr>
          <td colSpan={2}>Address Information || :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Address :</td>
          <td colSpan={2}>
            {addressDetails[1]?.addressLine1} {addressDetails[1]?.addressLine2}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>City :</td>
          <td colSpan={2}>{addressDetails[1]?.city}</td>
        </tr>
        <tr>
          <td colSpan={2}>Postal :</td>
          <td colSpan={2}>{addressDetails[1]?.postal}</td>
        </tr>
        <tr>
          <td colSpan={2}>State :</td>
          <td colSpan={2}>{addressDetails[1]?.state}</td>
        </tr>
      </tbody>
    </table>
  );
};
