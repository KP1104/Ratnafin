export const bankBranchMasterMetadata = {
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
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: { fullWidth: true },
    },
  },
  fields: [
    {
      render: { componentType: "textField" },
      name: "branchName",
      label: "Branch Name",
      placeholder: "Branch Name",
    },
    {
      render: { componentType: "textField" },
      name: "ifsc",
      label: "IFSC Code",
      placeholder: "IFSC Code",
    },
    {
      render: { componentType: "textField" },
      name: "city",
      label: "City",
      placeholder: "City",
    },
  ],
};
