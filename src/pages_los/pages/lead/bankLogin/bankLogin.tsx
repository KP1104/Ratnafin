import { Kanban } from "./kanban";
import { columns } from "./metaData/kanbanMetaData";
import { BankLoginStatusUndefined } from "./termsheet";

export const BankLogin = (props) => {
  const renderResult =
    ["FAILED", "SUCCESS"].indexOf(props?.otherDetails?.bank_login_status) >=
    0 ? (
      <>
        <Kanban
          columns={columns}
          filterBy={[
            "bankName",
            "branchName",
            "stageName",
            "subStageName",
            "sanctionFlag",
          ]}
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
