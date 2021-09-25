import { AccountDetails } from "./accountDetails";

export const AllAccountDetils = ({ accountDetails }) => {
  return (
    <div className="account-details-sec">
      <h2>Account Details:</h2>
      {accountDetails?.map((accountDetail, index) => (
        <AccountDetails
          key={index}
          accountDetail={accountDetail}
          count={index + 1}
        />
      ))}
    </div>
  );
};
