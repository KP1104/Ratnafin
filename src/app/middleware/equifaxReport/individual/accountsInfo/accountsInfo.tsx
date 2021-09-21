import { AllAccountDetils } from "./allAccountDetails";

export const AccountsInfo = ({ accountsInfo }) => {
  return (
    <article>
      <AllAccountDetils accountDetails={accountsInfo?.accountDetails} />
    </article>
  );
};
