import { Header } from "../header";
import { PersonalDetails } from "./personalDetails";
import { AddressDetails } from "./addressDetails";
import { EquifaxScore } from "./equifaxScore";
import { RecentActivitySummary } from "./recentActivitySummary";

export const PersonalInfo = ({ personalInfo, header }) => {
  return (
    <article id="cover">
      <Header headerDetails={header} />
      <hr />
      <PersonalDetails personalDetails={personalInfo} />
      <hr />
      <AddressDetails addressDetails={personalInfo?.addressInfo} />
      <hr />
      <EquifaxScore scoreDetails={personalInfo?.score} />
      <hr />
      <RecentActivitySummary
        recentActivitySummaryDetails={personalInfo?.recentActivities}
      />
    </article>
  );
};
