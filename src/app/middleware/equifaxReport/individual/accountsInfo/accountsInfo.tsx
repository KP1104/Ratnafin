import { AllAccountDetils } from "./allAccountDetails";
import { Header } from "../header";
import { Footer } from "../footer";

export const AccountsInfo = ({ header, accountsInfo }) => {
  return (
    <article>
      <Header headerDetails={header} />
      <hr />
      <AllAccountDetils accountDetails={accountsInfo?.accountDetails} />
      <Footer />
    </article>
  );
};
