export const zonesRegionMasterMetadata = {
  form: {
    name: "zoneRegionMasterNew",
    label: "Region Master",
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
      name: "regionName",
      label: "Region Name",
      placeholder: "Region Name",
      options: "getBranchList",
      fullWidth: true,
      isReadOnly: true,
    },
  ],
};
