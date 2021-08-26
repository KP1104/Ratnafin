import { Header } from "../../header";
import { AsGuarantor } from "./asGuarantor";

export const CreditTypeGuarantor = ({ header }) => {
  return (
    <article id="contents">
      <Header header={header} />
      <hr />
      <AsGuarantor />
    </article>
  );
};
