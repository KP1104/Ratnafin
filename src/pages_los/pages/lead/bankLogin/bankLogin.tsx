import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Kanban } from "./kanban";
import { columns } from "./metaData/kanbanMetaData";
import { BankLoginStatusUndefined } from "./termsheet";
import Dialog from "@material-ui/core/Dialog";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";

export const BankLogin = (props) => {
  const renderResult =
    ["FAILED", "SUCCESS"].indexOf(props?.otherDetails?.bank_login_status) >=
    0 ? (
      <>
        <Kanban
          columns={columns}
          filterBy={["bankName", "branchName", "stageName", "subStageName"]}
          splitItemsBy="statusCode" //items contaning column ID
          itemsKey="branchID" //unique Id for each item
          itemsPriorityKey="priority" //for sorting items
          otherDetails={props.otherDetails}
          {...props}
        />
      </>
    ) : (
      <BankLoginStatusUndefined
        closeDialog={props.closeDialog}
        bankLoginStatus={props?.otherDetails?.bank_login_status}
        leadNo={props?.otherDetails?.lead_no}
      />
    );
  return renderResult;
};

export const BankLoginWrapper = ({
  handleDialogClose,
  moduleType,
  goBackPath = "..",
}) => {
  const { state: rows }: any = useLocation();
  let navigate = useNavigate();
  let handleDialogCloseWrapper = useCallback(() => {
    handleDialogClose();
    navigate(goBackPath);
  }, [navigate]);
  return (
    <Dialog
      fullScreen
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
    >
      <HeaderDetails
        rowData={rows?.[0]}
        handleDialogClose={handleDialogCloseWrapper}
      />
      <BankLogin
        moduleType={moduleType}
        refID={rows[0].id}
        otherDetails={rows[0].data}
        closeDialog={handleDialogCloseWrapper}
      />
    </Dialog>
  );
};
