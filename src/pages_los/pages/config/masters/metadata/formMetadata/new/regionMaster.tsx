export const regionMasterMetadata = {
  form: {
    name: "regionMaster",
    label: "Region Master",
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
      name: "regionName",
      label: "Region Name",
      placeholder: "Enter Region Name",
      maxLength: 150,
      showMaxLength: false,
      GridProps: { xs: 12, md: 12, sm: 12 },
    },
  ],
};
