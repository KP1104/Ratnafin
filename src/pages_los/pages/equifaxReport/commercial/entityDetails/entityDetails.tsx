import { Header } from "../header";
import { BorrowerEntityDetails } from "./entityDetailsBorrower";
import { DelinquencyDetails } from "../delinquencyDetails";

export const EntityDetails = ({ header }) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <BorrowerEntityDetails />
      <hr />
      <div className="entity-details-borrower-sec">
        <DelinquencyDetails />
      </div>
    </article>
  );
};
