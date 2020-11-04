import { Engine } from "json-rules-engine";
import { FormFieldAtomType, DependentValuesType } from "packages/form";
import { CustomRuleType } from "../typesFields";
//localStorage.debug = "json-rules-engine";

export const ruleEngine = (rule: CustomRuleType) => async (
  fieldData: FormFieldAtomType,
  dependentFields: DependentValuesType
) => {
  const { success, failure, conditions } = rule;
  let engine = new Engine();
  const extendRule = {
    conditions: conditions,
    event: {
      type: "success",
    },
  };
  engine.addRule(extendRule);
  const result = await engine.run({ currentField: fieldData, dependentFields });
  engine.stop();
  if (result.events.length > 0) {
    return success;
  } else {
    return failure;
  }
};

// //sample Condition block
// const x = {
//   conditions: {
//     all: [
//       {
//         fact: "dependentFields",
//         path: "$.age.value",
//         operator: "lessThanInclusive",
//         value: {
//           fact: "dependentFields",
//           path: "$.maxAge.value",
//         },
//       },
//     ],
//   },
//   success: "YESSSS",
//   failure: "No",
// };
