import { Header } from "../header";
import { DerogatoryBorrower } from "./derogatoryBorrower";
import { DerogatoryGuarantor } from "./derogatoryGuarantor";
import { GuarantorRelatedInd } from "./gurantorRelatedInd";

import { CreditType } from "../creditType/creditTypeBorrower";

export const DerogatoryDetails = ({ header }) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <div className="entity-details-borrower-sec">
        <h2>
          <strong>5</strong>Derogatory Summary
        </h2>
        <DerogatoryBorrower />
        <DerogatoryGuarantor />
        <GuarantorRelatedInd />
        <CreditType />
      </div>
    </article>
  );
};
