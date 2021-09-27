export const InputEnquiry = ({ inputEnquiryDetails }) => {
  return (
    <div className="enquiry-sec last-table">
      <h2>Input Enquiry:</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              <span className="heading-color">
                Personal & Account Information
              </span>
            </th>
            <th scope="col">
              <span className="heading-color">ID & Phone Numbers</span>
            </th>
            <th scope="col">
              <span className="heading-color">Contact Details</span>
            </th>
          </tr>
          <tr>
            <td>
              Consumer’s First Name :{" "}
              <strong>{inputEnquiryDetails?.firstName}</strong>
            </td>
            <DisplayIDPhoneDetails
              accessor="pan"
              label="PAN :"
              idAndPhoneDetails={inputEnquiryDetails?.idAndPhoneDetails}
            />
            <td>Address Information 1:</td>
          </tr>
          <tr>
            <td>
              Consumer’s Family Name :{" "}
              <strong>{inputEnquiryDetails?.middleName}</strong>
            </td>
            <DisplayIDPhoneDetails
              accessor="voterID"
              label="Voter ID :"
              idAndPhoneDetails={inputEnquiryDetails?.idAndPhoneDetails}
            />
            <td>
              Address :
              <strong>{inputEnquiryDetails?.address?.[0]?.AddressLine1}</strong>
            </td>
          </tr>

          <tr>
            <td>
              DOB : <strong>{inputEnquiryDetails?.dateOfBirth}</strong>
            </td>
            <DisplayIDPhoneDetails
              accessor="passportID"
              label="Passport ID :"
              idAndPhoneDetails={inputEnquiryDetails?.idAndPhoneDetails}
            />
            <td>
              State :<strong>{inputEnquiryDetails?.address?.[0]?.State}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Gender : <strong>{inputEnquiryDetails?.gender}</strong>
            </td>
            <DisplayIDPhoneDetails
              accessor="uid"
              label="UID :"
              idAndPhoneDetails={inputEnquiryDetails?.idAndPhoneDetails}
            />
            <td>
              Postal :{" "}
              <strong>{inputEnquiryDetails?.address?.[0]?.Postal}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Inquiry / Request Purpose :{" "}
              <strong> {inputEnquiryDetails?.inquiryPurpose}</strong>
            </td>
            <DisplayIDPhoneDetails
              accessor="driverLicense"
              label="Driver's License :"
              idAndPhoneDetails={inputEnquiryDetails?.idAndPhoneDetails}
            />
            <td>{/* Address Information 2: */}</td>
          </tr>
          <tr>
            <td>
              Transaction Amount:
              <strong>{inputEnquiryDetails?.transactionAmount}</strong>
            </td>
            <DisplayIDPhoneDetails
              accessor="homePhone"
              label="Home Phone :"
              idAndPhoneDetails={inputEnquiryDetails?.idAndPhoneDetails}
            />
            <td></td>
          </tr>
          <tr>
            <td>Inquiry Account 1:</td>
            <DisplayIDPhoneDetails
              accessor="mobilePhone"
              label="Mobile Phone :"
              idAndPhoneDetails={inputEnquiryDetails?.idAndPhoneDetails}
            />
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const DisplayIDPhoneDetails = ({ accessor, label, idAndPhoneDetails }) => {
  return (
    <td>
      {label} <strong>{idAndPhoneDetails[accessor]}</strong>
    </td>
  );
};
