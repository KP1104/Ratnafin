import {
  myTaskGridMetaData,
  assignedTaskGridMetaData,
} from "./task/metadata/grid";
import { worklogGridMetaData } from "./worklog/metadata";
import { coldCallingGridMetaData } from "./coldCalling/gridMetadata";

export const getGridFormMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/009":
      return myTaskGridMetaData;
    case "TRN/008":
      return assignedTaskGridMetaData;
    case "TRN/014":
      return worklogGridMetaData;
    case "TRN/015":
      return coldCallingGridMetaData;
    default:
      throw { error_msg: "Invalid Product type" };
  }
};
