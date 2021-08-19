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
        {personalDetail?.fullName}
      </li>
      <li>
        <strong>DOB:</strong>
        {personalDetail?.dob}
      </li>
      <li>
        <strong>Age:</strong>
        {personalDetail?.age}
      </li>
      <li>
        <strong>Gender:</strong>
        {personalDetail?.gender}
      </li>
      <li>
        <strong>Total Income:</strong>
        {personalDetail?.totalIncome}
      </li>
      <li>
        <strong>Occupation:</strong>
        {personalDetail?.occupation}
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
        {identificationDetail?.panID}
      </li>
      <li>
        <strong>Voter ID:</strong>
        {identificationDetail?.voterID}
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
        {contactDetail?.homePhone}
      </li>
      <li>
        <strong>Office:</strong>
      </li>
      <li>
        <strong>Mobile:</strong>
        {contactDetail?.mobilePhone}
      </li>
      <li>
        <strong>Email:</strong>
        {contactDetail?.email}
      </li>
    </ul>
  );
};
