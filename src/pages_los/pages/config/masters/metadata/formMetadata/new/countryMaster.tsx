export const countryMasterMetadata = {
  form: {
    name: "countryMaster",
    label: "Country Master",
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
      name: "countryName",
      label: "Country Name",
      placeholder: "Enter Country Name",
      maxLength: 150,
      showMaxLength: false,
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
  ],
};
