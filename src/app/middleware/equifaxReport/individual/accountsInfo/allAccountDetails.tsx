import { AccountDetails } from "./accountDetails";

export const AllAccountDetils = ({ accountDetails }) => {
  let details = accountDetails?.map((accountDetail, index) => (
    <div className="page-bre">
      <AccountDetails
        key={index}
        accountDetail={accountDetail}
        count={index + 1}
      />
    </div>
  ));
  // let final: any = [];
  // let appender: any = [];
  // for (let i = 0; i < details.length; i++) {
  //   appender.push(details[i]);
  //   if (i % 2 || i === details.length - 1) {
  //     final.push(<div className="page-bre">{[...appender]}</div>);
  //     appender = [];
  //   }
  // }
  return (
    <div className="account-details-sec ">
      <h2>Account Details:</h2>
      {details}
    </div>
  );
};
