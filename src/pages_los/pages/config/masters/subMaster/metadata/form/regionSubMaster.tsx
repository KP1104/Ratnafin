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
      name: "branchName",
      label: "Branch Name",
      placeholder: "Branch Name",
      options: "getBranchList",
      fullWidth: true,
      isReadOnly: true,
    },
    {
      render: { componentType: "textField" },
      name: "city",
      label: "City",
      placeholder: "City",
      fullWidth: true,
      isReadOnly: true,
    },
  ],
};
