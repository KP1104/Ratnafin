import { MetaDataType } from "components/dyanmicForm/types";
export const stageChangeMetaData: MetaDataType = {
  form: {
    name: "updateLeadStage",
    label: "Change Lead Stage",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: {
          xs: 12,
          sm: 12,
          md: 12,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
      },
      name: "stageCode",
      label: "Lead Stage",
      required: true,
      //@ts-ignore
      options: "getLeadStage",
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "select",
      },
      name: "subStageCode",
      label: "Lead Sub Stages",
      disableCaching: true,
      //@ts-ignore
      dependentFields: ["stageCode"],
      //@ts-ignore
      options: "getLeadSubStageCode",
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "remarks",
      label: "Remarks",
      multiline: true,

      rows: 3,
    },
  ],
};
