import { getRoleOptions, getTeamMemebersOptions } from "./api";

export const teamMemberAddMetadata = {
  form: {
    name: "addTeamMember",
    label: "Add Team Member",
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
      name: "teamRole",
      label: "Team Role",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
      options: getRoleOptions,
      _optionsKey: "getRoleOptions",
    },
    {
      render: { componentType: "select" },
      name: "member",
      label: "Member Name",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
      dependentFields: ["teamRole"],
      disableCaching: true,
      options: getTeamMemebersOptions,
      _optionsKey: "getTeamMemebersOptions",
    },
  ],
};
