export const EnquiryInputDetails = ({ enquiryInputDetails }: any) => {
  const idAndPhoneDetails =
    typeof enquiryInputDetails === "object"
      ? enquiryInputDetails?.idAndPhoneDetails
      : {};

  return (
    <>
      <h2>
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
              className="entity-bro-none entity-box"
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
              className="entity-bro-none entity-box"
            >
              <IdentificationDetails idAndPhoneDetails={idAndPhoneDetails} />
            </td>
            <td
              style={{
                padding: 0,
                borderTop: "none",
                width: "34%",
                display: "inline-block",
                verticalAlign: "top",
              }}
              className="entity-bro-none entity-box"
            >
              <AddressDetails
                addressDetails={enquiryInputDetails?.inquiryAddresses}
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
          <th scope="col" colSpan={6}>
            <span className="heading-color">Company & Inquiry Info</span>
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
          <td colSpan={2}>{enquiryInputDetails?.businessRegistrationNo}</td>
        </tr>
        <tr>
          <td colSpan={2}>Date Of Incorporation :</td>
          <td colSpan={2}>{enquiryInputDetails?.dateIncorporation}</td>
        </tr>
        <tr>
          <td colSpan={2}>Bussiness Category :</td>
          <td colSpan={2}>{enquiryInputDetails?.businessCategory}</td>
        </tr>
        <tr>
          <td colSpan={2}>Industry Type :</td>
          <td colSpan={2}>{enquiryInputDetails?.businessIndustryType}</td>
        </tr>
        <tr>
          <td colSpan={2}>Enquiry Purpose :</td>
          <td colSpan={2}>{enquiryInputDetails?.inquiryPurpose}</td>
        </tr>
        <tr>
          <td colSpan={2}>Enquiry Amount :</td>
          <td colSpan={2}>{enquiryInputDetails?.transactionAmount}</td>
        </tr>
      </tbody>
    </table>
  );
};

const IdentificationDetails = ({ idAndPhoneDetails }: any) => {
  return (
    <table className="table" style={{ borderTop: "none", marginBottom: "0" }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan={6}>
            <span className="heading-color">ID & Phone Numbers</span>
          </th>
        </tr>
      </thead>
      <tbody className="bro-none">
        <DisplayIDPhoneDetails
          accessor="dunsNumber"
          label="DUNS Number :"
          idAndPhoneDetails={idAndPhoneDetails}
        />
        <DisplayIDPhoneDetails
          accessor="pan"
          label="PAN :"
          idAndPhoneDetails={idAndPhoneDetails}
        />
        <DisplayIDPhoneDetails
          accessor="cin"
          label="CIN :"
          idAndPhoneDetails={idAndPhoneDetails}
        />
        <DisplayIDPhoneDetails
          accessor="tin"
          label="TIN :"
          idAndPhoneDetails={idAndPhoneDetails}
        />
        <DisplayIDPhoneDetails
          accessor="serviceTaxNo"
          label="Service Tax No:"
          idAndPhoneDetails={idAndPhoneDetails}
        />
        <PhonesEmailDetails phoneEmailDetails={idAndPhoneDetails} />
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
            <span className="heading-color">Address Details</span>
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

const PhonesEmailDetails = ({ phoneEmailDetails }: any) => {
  return (
    <>
      <DisplayIDPhoneDetails
        accessor="landline"
        label="Landline :"
        idAndPhoneDetails={phoneEmailDetails}
      />
      <DisplayIDPhoneDetails
        accessor="mobile"
        label="Mobile :"
        idAndPhoneDetails={phoneEmailDetails}
      />
      <DisplayIDPhoneDetails
        accessor="fax"
        label="Fax :"
        idAndPhoneDetails={phoneEmailDetails}
      />
      <DisplayIDPhoneDetails
        accessor="email"
        label="Email :"
        idAndPhoneDetails={phoneEmailDetails}
      />
    </>
  );
};

const DisplayIDPhoneDetails = ({ accessor, label, idAndPhoneDetails }) => {
  return (
    <tr>
      <td colSpan={2}>{label}</td>
      <td colSpan={2}>{idAndPhoneDetails[accessor]}</td>
    </tr>
  );
};
