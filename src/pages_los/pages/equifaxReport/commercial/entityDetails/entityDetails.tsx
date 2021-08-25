import { Header } from "../header";
import { BorrowerEntityDetails } from "./entityDetailsBorrower";
import { DelinquencyDetails } from "../delinquencyDetails";

export const EntityDetails = () => {
  return (
    <article id="contents">
      <Header />
      <hr />
      <BorrowerEntityDetails />
      <hr />
      <div className="entity-details-borrower-sec">
        <DelinquencyDetails />
      </div>
    </article>
  );
};
