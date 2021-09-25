export const countryZoneMasterMetadata = {
  form: {
    name: "countryZoneMasterNew",
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
      render: { componentType: "select" },
      name: "zoneName",
      label: "Zone Name",
      placeholder: "Zone Name",
      options: "getBranchList",
      fullWidth: true,
      isReadOnly: true,
    },
  ],
};
