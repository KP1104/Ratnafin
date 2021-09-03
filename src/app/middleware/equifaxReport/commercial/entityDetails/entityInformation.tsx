import { Address } from "./address";
import { RelatedIndividuals } from "./relatedIndividual";
import { RelatedEntity } from "./relatedEntity";
import { CreditFacility } from "../openCreditFacilitySummary";

export const EntityPersonalnfo = ({ info, openCreditFcility }) => {
  return (
    <div className="entity-details-borrower-sec">
      <h2>
        <strong>2</strong> Entity Details - Borrower
      </h2>
      <table
        className="table"
        style={{
          borderTop: "none",
          border: "solid 1px #dee2e6",
          marginBottom: "0",
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
              <EntityInformation personalInfo={info?.personalInformation} />
            </td>
            <td
              style={{
                padding: "0",
                borderTop: "none",
                width: "33%",
                display: "inline-block",
                verticalAlign: "top",
                height: "100%",
              }}
              className="entity-bro-none"
            >
              <IdentificationInfo identificationInfo={info?.idInformation} />
            </td>
            <td
              style={{
                padding: "0",
                borderTop: "none",
                width: "34%",
                display: "inline-block",
                verticalAlign: "top",
              }}
              className="entity-bro-none"
            >
              <ContactInfo contactInfo={info?.contactInformation} />
            </td>
          </tr>
        </tbody>
      </table>
      <Address addressDetails={info?.addressInformation} />
      <RelatedIndividuals individualDetails={info?.relatedIndividuals} />
      <RelatedEntity relatedEntity={info?.relatedEntities} />
      <CreditFacility openCreditFcility={openCreditFcility} />
    </div>
  );
};

const EntityInformation = ({ personalInfo }) => {
  return (
    <table className="table" style={{ marginBottom: 0 }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan={3}>
            Entity Information
          </th>
        </tr>
      </thead>
      <tbody className="bro-none">
        <tr>
          <td colSpan={2}>Full Name :</td>
          <td colSpan={2}>{personalInfo?.BusinessName}</td>
        </tr>
        <tr>
          <td colSpan={2}>Short Name :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Company Status** :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Business Category :</td>
          <td colSpan={2}>{personalInfo?.BusinessCategory}</td>
        </tr>
        <tr>
          <td colSpan={2}>Business Industry Type :</td>
          <td colSpan={2}>{personalInfo?.BusinessIndustryType}</td>
        </tr>
        <tr>
          <td colSpan={2}>Date of Incorporation :</td>
          <td colSpan={2}>{personalInfo?.DateIncorporation}</td>
        </tr>
        <tr>
          <td colSpan={2}>Legal Constitution :</td>
          <td colSpan={2}>{personalInfo?.BusinessLegalConstitution}</td>
        </tr>
        <tr>
          <td colSpan={2}>Sales Figure :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Class of Activity :</td>
          <td colSpan={2}>{personalInfo?.ClassActivity}</td>
        </tr>
        <tr>
          <td colSpan={2}>Employee Count :</td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </table>
  );
};

const IdentificationInfo = ({ identificationInfo }) => {
  return (
    <table className="table" style={{ borderTop: "none", marginBottom: "0" }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan={3}>
            Identification
          </th>
        </tr>
      </thead>
      <tbody className="bro-none">
        <tr>
          <td colSpan={2}>CIN :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>TIN :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>PAN :</td>
          <td colSpan={2}>{identificationInfo?.pan}</td>
        </tr>
        <tr>
          <td colSpan={2}>Service Tax No :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Business Registration Date** :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Company Registration NBR :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Registered State** :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>Paid-up Capital** :</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </table>
  );
};

const ContactInfo = ({ contactInfo }) => {
  return (
    <table className="table" style={{ borderTop: "none", marginBottom: "0" }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col" colSpan={3}>
            Contact Details
          </th>
        </tr>
      </thead>
      <tbody className="bro-none">
        <tr>
          <td colSpan={2}>Landline :</td>
          <td colSpan={2}>{contactInfo?.Landline}</td>
        </tr>
        <tr>
          <td colSpan={2}>Mobile :</td>
          <td colSpan={2}>{contactInfo?.Mobile}</td>
        </tr>
        <tr>
          <td colSpan={2}>Other :</td>
          <td colSpan={2}>{contactInfo?.Other}</td>
        </tr>
        <tr>
          <td colSpan={2}>Fax :</td>
          <td colSpan={2}>{contactInfo?.Fax}</td>
        </tr>
        <tr>
          <td colSpan={2}>Email ID** :</td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </table>
  );
};
