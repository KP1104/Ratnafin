import { getBranch } from "./api";

export const regionBranchMasterMetadata = {
  form: {
    name: "bankBranchMasterNew",
    label: "Branch Master",
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
  },
  fields: [
    {
      render: { componentType: "select" },
      name: "subCode",
      label: "Branch Name",
      placeholder: "Branch Name",
      defaultValue: "00",
      options: getBranch,
      showCheckbox: true,
      multiple: true,
      fullWidth: true,
      disableCaching: true,
    },
  ],
};
