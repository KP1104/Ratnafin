import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import Report from "components/report";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { getBankLoginAuditData } from "./api";
import { auditMetadata } from "./metadata";

const AuditDownload = ({ moduleType, refID }) => {
  const query = useQuery<any, any>(
    ["getBankLoginAuditData", moduleType, refID],
    () => getBankLoginAuditData({ moduleType, refID })
  );

  return query.isError ? (
    <span>{query.error?.error_msg}</span>
  ) : (
    <Report
      columns={auditMetadata ?? []}
      disableFilters
      maxHeight={window.innerHeight - 300}
      data={query?.data ?? []}
      title="Audit"
      options={{
        disableGroupBy: true,
      }}
      loading={query.isLoading}
      hideFooter={true}
    />
  );
};

export const AuditDownloadWrapper = ({
  handleDialogClose,
  moduleType,
  goBackPath = "..",
}) => {
  const dialogClasses = useDialogStyles();
  const { state: rows }: any = useLocation();
  let navigate = useNavigate();
  let handleDialogCloseWrapper = useCallback(() => {
    handleDialogClose();
    navigate(goBackPath);
  }, [navigate]);
  return (
    <Dialog
      open={true}
      maxWidth="lg"
      PaperProps={{
        style: { width: "100%" },
      }}
      classes={{
        scrollPaper: dialogClasses.topScrollPaper,
        paperScrollBody: dialogClasses.topPaperScrollBody,
      }}
      onClose={handleDialogClose}
    >
      <AuditDownload moduleType={moduleType} refID={rows[0].id} />
    </Dialog>
  );
};
