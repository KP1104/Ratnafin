import { Kanban } from "./kanban";
import { columns } from "./metaData/kanbanMetaData";
import { BankLoginStatusUndefined } from "./termsheet";
import Dialog from "@material-ui/core/Dialog";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import { useLocation } from "react-router-dom";

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

export const BankLoginWrapper = ({ handleDialogClose, moduleType }) => {
  const { state: rows }: any = useLocation();
  return (
    <Dialog
      fullScreen
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      onClose={handleDialogClose}
    >
      <HeaderDetails
        rowData={rows?.[0]}
        handleDialogClose={handleDialogClose}
      />
      <BankLogin
        moduleType={moduleType}
        refID={rows[0].id}
        otherDetails={rows[0].data}
        closeDialog={handleDialogClose}
      />
    </Dialog>
  );
};
