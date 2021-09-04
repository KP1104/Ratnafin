import { AllAccountDetils } from "./allAccountDetails";
import { Header } from "../header";

export const AccountsInfo = ({ header, accountsInfo }) => {
  return (
    <article id="contents">
      <Header headerDetails={header} />
      <hr />
      <AllAccountDetils accountDetails={accountsInfo?.accountDetails} />
    </article>
  );
};
