import { getIn, setIn } from "packages/form";

let map = new Map();

export const metaDataDiffGenerator = (newMeta, viewMeta, editMeta) => {
  let accum = [];
  JSONWalker(newMeta, "", "", accum);
  console.log(accum);
};

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
