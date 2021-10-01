import { getZone } from "./api";

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
      name: "subCode",
      label: "Zone Name",
      placeholder: "Zone Name",
      defaultValue: "00",
      options: getZone,
      multiple: true,
      showCheckbox: true,
      fullWidth: true,
      disableCaching: true,
    },
  ],
};
