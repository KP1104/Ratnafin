export const zoneMasterEditViewMetadata = {
  form: {
    name: "zoneMasterEdit",
    label: "Zone Master",
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
      render: { componentType: "textField" },
      name: "code",
      label: "Zone Code",
      isReadOnly: true,
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
    {
      render: { componentType: "textField" },
      name: "zoneName",
      label: "Zone Name",
      placeholder: "Enter Zone Name",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "active",
      label: "Active",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
      defaultValue: true,
    },
  ],
};
