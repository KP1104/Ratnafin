import { MetaDataType } from "components/dyanmicForm/types";
export const priorityChangeMetaData: MetaDataType = {
  form: {
    name: "updatePriorityForInquiry",
    label: "Change Priority",
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
      name: "priority",
      label: "Priority",
      required: true,
      //@ts-ignore
      options: "getLeadPriority",
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "select",
      },
      name: "enableHoldDays",
      label: "Change Priority Hold Days",
      defaultValue: "N",
      options: [
        { label: "Yes", value: "Y" },
        { label: "No", value: "N" },
      ],
      _optionsKey: "enableHoldDaysOptions",
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "priorityDays",
      label: "Priority Hold Days",
      required: true,
      FormatProps: {
        format: "##",
        isAllowed: (values) => {
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      dependentFields: ["enableHoldDays"],
      shouldExclude: "readOnlyPriorityHoldDays",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "priorityRemarks",
      label: "Remarks",
      multiline: true,
      rows: 3,
    },
  ],
};
