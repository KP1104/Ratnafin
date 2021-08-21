import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { useParams } from "react-router-dom";
import { AccountsInfo } from "./components/accountsInfo";
import { PersonalInfo } from "./components/personalInfo";
import { EnquiryInfo } from "./components/enquiryInfo";
import { GlossaryTermsExplanation } from "./components/glossaryTermExplanation";
import { MiddlewareSDK } from "registry/fns/middleware";
import "./styles.css";

export const EquifaxReportWrapper = () => {
  const { tokenID } = useParams();
  const result = useQuery(["getMandateFormData", tokenID], () =>
    MiddlewareSDK.getEqifaxReportData({ tokenID })
  );
  const data = result?.data;
  const loading = result?.isLoading || result?.isFetching;
  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : (
    <>
      <PersonalInfo personalInfo={data?.customer} header={data?.header} />
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
