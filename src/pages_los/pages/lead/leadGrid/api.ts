import {
  leadGridMetaData,
  leadBankLoginMetaData,
  leadMandateMetaData,
  leadSanctionMetaData,
  leadDisbursementMetaData,
  headLeadGridMetaData,
} from "./metaData";
import { screens } from "./consts";

export const getGridMetaData =
  ({ gridCode }) =>
  async () => {
    switch (gridCode) {
      case screens.details: {
        return leadGridMetaData;
      }
      case screens.mandate: {
        return leadMandateMetaData;
      }
      case screens.bankLogin: {
        return leadBankLoginMetaData;
      }
      case screens.sanction: {
        return leadSanctionMetaData;
      }
      case screens.disbursement: {
        return leadDisbursementMetaData;
      }
      case screens.headDetails: {
        return headLeadGridMetaData;
      }
      default:
        return leadGridMetaData;
    }
  };
