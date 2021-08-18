export const InputEnquiry = ({ inputEnquiryDetails }) => {
  return (
    <div className="enquiry-sec last-table">
      <h2>Input Enquiry:</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Personal & Account Information</th>
            <th scope="col">ID & Phone Numbers</th>
            <th scope="col">Contact Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Consumer’s First Name :{" "}
              <strong>{inputEnquiryDetails?.firstName}</strong>
            </td>
            <td>
              PAN: <strong>{inputEnquiryDetails?.panID}</strong>
            </td>
            <td>Address Information 1:</td>
          </tr>
          <tr>
            <td>
              Consumer’s Family Name : <strong>KUMAR</strong>
            </td>
            <td>
              Voter ID: <strong>{inputEnquiryDetails?.voterID}</strong>
            </td>
            <td>
              Address :
              <strong> {inputEnquiryDetails?.address[0]?.AddressLine1}</strong>
            </td>
          </tr>

          <tr>
            <td>
              DOB : <strong>{inputEnquiryDetails?.dateOfBirth}</strong>
            </td>
            <td>Passport ID:</td>
            <td>
              State : <strong>{inputEnquiryDetails?.address[0]?.State}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Gender : <strong>{inputEnquiryDetails?.gender}</strong>
            </td>
            <td>UID:</td>
            <td>
              Postal :{" "}
              <strong>{inputEnquiryDetails?.address[0]?.Postal}</strong>
            </td>
          </tr>
          <tr>
            <td>
              Inquiry / Request Purpose : <strong> Secured Credit Card</strong>
            </td>
            <td>
              Driver's License:
              <strong></strong>
            </td>
            <td>Address Information 2:</td>
          </tr>
          <tr>
            <td>
              Transaction Amount:
              <strong>{inputEnquiryDetails?.transactionAmount}</strong>
            </td>
            <td>
              Home Phone :<strong>{inputEnquiryDetails?.homePhone}</strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Inquiry Account 1:</td>
            <td>
              Mobile Phone : <strong> {inputEnquiryDetails?.number}</strong>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
