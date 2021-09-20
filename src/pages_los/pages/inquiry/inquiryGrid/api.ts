import {
  allAssignedMetaData,
  assignedMetaData,
  crossMetaData,
  incomingMetaData,
  myCrossMetaData,
  myInquiryMetaData,
  myTeamCrossMetaData,
  myUnmappedMetaData,
  unmappedHOMetaData,
  unmappedMetaData,
} from "./metaData";

export const getGridMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "INQ/001": {
      return incomingMetaData;
    }
    case "INQ/002": {
      return allAssignedMetaData;
    }
    case "INQ/003": {
      return myInquiryMetaData;
    }
    case "INQ/004": {
      return myUnmappedMetaData;
    }
    case "INQ/005": {
      return unmappedMetaData;
    }
    case "INQ/006": {
      return unmappedHOMetaData;
    }
    case "INQ/007": {
      return myCrossMetaData;
    }
    case "INQ/008": {
      return myTeamCrossMetaData;
    }
    default: {
      return assignedMetaData;
    }
  }
};
