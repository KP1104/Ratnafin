import { AccountSummaryAll } from "./accountSummaryAll";
import { Header } from "../header";

export const AccountSummary = ({ header, accountsSummary }) => {
  return (
    <article id="contents">
      <Header headerDetails={header} />
      <hr />
      <AccountSummaryAll accountSummary={accountsSummary} />
      <hr />
    </article>
  );
};
