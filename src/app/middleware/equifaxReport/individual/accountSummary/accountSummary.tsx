import { AccountSummaryAll } from "./accountSummaryAll";

export const AccountSummary = ({ accountsSummary }) => {
  return (
    <article>
      <AccountSummaryAll accountSummary={accountsSummary} />
    </article>
  );
};
