export const zoneMasterMetadata = {
  form: {
    name: "zoneMaster",
    label: "Zone Master",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
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
      name: "zoneName",
      label: "Zone Name",
      placeholder: "Enter Zone Name",
      maxLength: 150,
      showMaxLength: false,
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
  ],
};
