import { MetaDataType } from "components/dyanmicForm";

export const ITRAnalysisMetaData: MetaDataType = {
  form: {
    name: "itrAPI",
    label: "ITR Analysis Request Interface",
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
      datePicker: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
      },
      name: "entityType",
      label: "Entity",
      defaultValue: "L",
      options: [
        { value: "L", label: "Legal" },
        { value: "I", label: "Individual" },
      ],
    },
    {
      render: {
        componentType: "select",
      },
      name: "management",
      label: "Management Person",
      //@ts-ignore
      options: "getManagementPersonnel",
      dependentFields: ["entityType"],
      shouldExclude: "shouldExcludeExternalAPIManagementDetails",
    },
  ],
};
