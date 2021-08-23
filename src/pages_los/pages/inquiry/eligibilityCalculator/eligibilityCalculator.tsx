import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import {
  EligibilityCalculatorLAPBusinessOrProfessional,
  EligibilityCalculatorLAPSalaried,
} from "./metadata/lap";
import {
  EligibilityCalculatorHLBusinessOrProfessional,
  EligibilityCalculatorHLSalaried,
} from "./metadata/newHomeLoan";
export const EligibilityCalculator = ({
  employeentType,
  loanAmount,
  productId,
  employeeCode,
}) => {
  let initalValue = {
    ...{
      loanAmount: loanAmount,
      employementType: employeentType,
      employementCode: employeeCode,
    },
  };

  let metadata;

  switch (`${employeeCode}${productId}`) {
    case "0312300001":
    case "0112300001":
      metadata = EligibilityCalculatorHLBusinessOrProfessional;
      break;
    case "0212300001":
      metadata = EligibilityCalculatorHLSalaried;
      break;
    case "0312300002":
    case "0112300002":
      metadata = EligibilityCalculatorLAPBusinessOrProfessional;
      break;

    case "0212300002":
      metadata = EligibilityCalculatorLAPSalaried;
      break;
  }

  return (
    <FormWrapper
      key={"eligibilityCalculator"}
      metaData={metadata as MetaDataType}
      initialValues={initalValue}
      onSubmitHandler={() => {}}
      //@ts-ignore
      displayMode={"new"}
      disableGroupErrorDetection={false}
    ></FormWrapper>
  );
};
