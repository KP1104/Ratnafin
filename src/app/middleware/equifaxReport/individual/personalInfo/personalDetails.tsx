export const PersonalDetails = ({ personalDetails }) => {
  return (
    <div className="middle-sec">
      <h2>Consumer Name: {personalDetails?.fullName}</h2>
      <PersonalInfo personalDetail={personalDetails} />
      <Identification identificationDetail={personalDetails} />
      <ContactDetails contactDetail={personalDetails} />
    </div>
  );
};

const PersonalInfo = ({ personalDetail }) => {
  return (
    <ul>
      <li>
        <span>Personal Information</span>
      </li>
      <li>
        <strong>Name:</strong>
        <b>{personalDetail?.fullName}</b>
      </li>
      <li>
        <strong>DOB:</strong>
        <b>{personalDetail?.dob}</b>
      </li>
      <li>
        <strong>Age:</strong>
        <b>{personalDetail?.age}</b>
      </li>
      <li>
        <strong>Gender:</strong>
        <b>{personalDetail?.gender}</b>
      </li>
      <li>
        <strong>Total Income:</strong>
        <b>{personalDetail?.totalIncome}</b>
      </li>
      <li>
        <strong>Occupation:</strong>
        <b>{personalDetail?.occupation}</b>
      </li>
    </ul>
  );
};

const Identification = ({ identificationDetail }) => {
  return (
    <ul>
      <li>
        <span>Identification</span>
      </li>
      <li>
        <strong>PAN:</strong>
        <b>{identificationDetail?.panID}</b>
      </li>
      <li>
        <strong>Voter ID:</strong>
        <b>{identificationDetail?.voterID}</b>
      </li>
    </ul>
  );
};

const ContactDetails = ({ contactDetail }) => {
  return (
    <ul>
      <li>
        <span>Contact Details</span>
      </li>
      <li>
        <strong>Home:</strong>
        <b>{contactDetail?.homePhone}</b>
      </li>
      <li>
        <strong>Office:</strong>
        <b></b>
      </li>
      <li>
        <strong>Mobile:</strong>
        <b>{contactDetail?.mobilePhone}</b>
      </li>
      <li>
        <strong>Email:</strong>
        <b>{contactDetail?.email}</b>
      </li>
    </ul>
  );
};
