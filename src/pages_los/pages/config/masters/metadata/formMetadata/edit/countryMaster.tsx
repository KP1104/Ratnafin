export const countryMasterEditViewMetadata = {
  form: {
    name: "countryMasterEdit",
    label: "Country Master",
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
      label: "Country Code",
      isReadOnly: true,
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
    {
      render: { componentType: "textField" },
      name: "countryName",
      label: "Country Name",
      placeholder: "Enter Country Name",
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
