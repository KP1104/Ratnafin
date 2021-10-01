export const campaignFormMetadata = {
  form: {
    name: "campaign",
    label: "Campaign",
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
      render: { componentType: "hidden" },
      name: "refID",
      label: "refID",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
    {
      render: { componentType: "textField" },
      name: "campaignName",
      label: "Campaign Name",
      placeholder: "Enter Campaign Name",
      maxLength: 50,
      showMaxLength: false,
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
    {
      render: { componentType: "textField" },
      name: "description",
      label: "Description",
      placeholder: "Write Description",
      maxLength: 200,
      showMaxLength: false,
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
    },
  ],
};
