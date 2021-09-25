import {
  allAssignedMetaData,
  assignedMetaData,
  incomingMetaData,
  myCrossMetaData,
  myInquiryMetaData,
  myTeamCrossMetaData,
  myUnmappedMetaData,
  unmappedHOMetaData,
  unmappedMetaData,
} from "./metaData";

export const getGridMetaData =
  ({ gridCode }) =>
  async () => {
    switch (gridCode) {
      case "INQ/002": {
        return incomingMetaData;
      }
      case "INQ/003": {
        return allAssignedMetaData;
      }
      case "INQ/004": {
        return myInquiryMetaData;
      }
      case "INQ/005": {
        return myUnmappedMetaData;
      }
      case "INQ/006": {
        return unmappedMetaData;
      }
      case "INQ/007": {
        return unmappedHOMetaData;
      }
      case "INQ/008": {
        return myCrossMetaData;
      }
      case "INQ/009": {
        return myTeamCrossMetaData;
      }
      default: {
        return assignedMetaData;
      }
    }
  };
