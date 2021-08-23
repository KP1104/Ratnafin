import {
  EligibilityCalculatorLAPBusinessOrProfessional,
  EligibilityCalculatorLAPSalaried,
} from "./metadata/lap";
import {
  EligibilityCalculatorHLBusinessOrProfessional,
  EligibilityCalculatorHLSalaried,
} from "./metadata/newHomeLoan";

export const getMetadata = () => async (employeeCode, productId) => {
  switch (`${employeeCode}${productId}`) {
    case "0312300001":
    case "0112300001":
      return EligibilityCalculatorHLBusinessOrProfessional;
    case "0212300001":
      return EligibilityCalculatorHLSalaried;
    case "0312300002":
    case "0112300002":
      return EligibilityCalculatorLAPBusinessOrProfessional;
    case "0212300002":
      return EligibilityCalculatorLAPSalaried;
  }
};
