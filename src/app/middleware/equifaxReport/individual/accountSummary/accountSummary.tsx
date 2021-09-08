import { AccountSummaryAll } from "./accountSummaryAll";
import { Header } from "../header";
import { Footer } from "../footer";

export const AccountSummary = ({ header, accountsSummary }) => {
  return (
    <article id="contents">
      <Header headerDetails={header} />
      <hr />
      <AccountSummaryAll accountSummary={accountsSummary} />
      <Footer />
      <hr />
    </article>
  );
};
