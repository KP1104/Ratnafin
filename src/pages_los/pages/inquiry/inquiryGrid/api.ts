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

import { screens } from "./consts";

export const getGridMetaData =
  ({ gridCode }) =>
  async () => {
    switch (gridCode) {
      case screens.incomingInquiries: {
        return incomingMetaData;
      }
      case screens.allAssignedInquiries: {
        return allAssignedMetaData;
      }
      case screens.myInquiry: {
        return myInquiryMetaData;
      }
      case screens.myUnmappedInquiries: {
        return myUnmappedMetaData;
      }
      case screens.unmappedInquiries: {
        return unmappedMetaData;
      }
      case screens.unmappedHOInquiries: {
        return unmappedHOMetaData;
      }
      case screens.myCrossInquiries: {
        return myCrossMetaData;
      }
      case screens.myTeamCrossInquiries: {
        return myTeamCrossMetaData;
      }
      default: {
        return assignedMetaData;
      }
    }
  };
