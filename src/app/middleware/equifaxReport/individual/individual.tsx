import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { useParams } from "react-router-dom";
import { AccountsInfo } from "./accountsInfo";
import { PersonalInfo } from "./personalInfo";
import { EnquiryInfo } from "./enquiryInfo";
import { GlossaryTermsExplanation } from "./glossaryTermExplanation";
import { AccountSummary } from "./accountSummary";
import { MiddlewareSDK } from "registry/fns/middleware";
import { transform } from "./transform";
import "assets/css/bootstrap.min.css";
import "./styles.css";

export const IndividualEquifaxReport = () => {
  const { tokenID } = useParams();
  const result = useQuery(["getMandateFormData", tokenID], () =>
    MiddlewareSDK.getEqifaxReportData({ tokenID })
  );
  const data = result.data;
  transform(data);
  const loading = result?.isLoading || result?.isFetching;
  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : (
    <>
      <PersonalInfo personalInfo={data?.customer} header={data?.header} />
      <AccountSummary accountsSummary={data?.account} header={data?.header} />
      <AccountsInfo accountsInfo={data?.account} header={data?.header} />
      <EnquiryInfo
        enquirySummaryInfo={data?.enquirySummary}
        enquiryInputInfo={data?.inputEnquiry}
        header={data?.header}
      />
      <GlossaryTermsExplanation header={data?.header} />
    </>
  );
  return renderResult;
};
