import { Entity } from "./entity";
import { Header } from "../header";

export const EntityNameDetails = ({ header }) => {
  return (
    <article id="cover">
      <Header header={header} />
      <hr />
      <Entity />
    </article>
  );
};
