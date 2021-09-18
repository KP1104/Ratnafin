import { getIn, setIn } from "packages/form";
import { checkForPrecondition } from "./preconditionCheck";

export const metaDataDiffGenerator = (newMeta, viewMeta, editMeta) => {
  console.log(
    checkForPrecondition(newMeta.fields, viewMeta.fields, editMeta.fields)
  );
};

/*

const JSONWalker = (
  currentObj: any,
  currentPath: string = "",
  lastKey: string | number = "",
  accum: string[] = []
) => {
  if (typeof currentObj === "object" && currentObj !== null) {
    for (const [key, val] of Object.entries(currentObj)) {
      const path = Boolean(currentPath) ? `${currentPath}.${key}` : `${key}`;
      JSONWalker(val, path, key, accum);
    }
  } else if (Array.isArray(currentObj)) {
    currentObj.forEach((value, index) => {
      const path = Boolean(currentPath)
        ? `${currentPath}.${index}`
        : `${index}`;
      JSONWalker(value, path, index, accum);
    });
  } else {
    accum.push(currentPath);
    return accum;
  }
};
*/
