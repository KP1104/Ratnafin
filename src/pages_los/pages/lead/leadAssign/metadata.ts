import { MetaDataType } from "components/dyanmicForm/types";
import * as API from "./api";
export const leadAssignMetadata: MetaDataType = {
  form: {
    name: "leadAssignForm",
    label: "Assignment",
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
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "arrayField",
      },
      name: "usersAssignDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Lead Assignment",
      fixedRows: true,
      getFixedRowsCount: () => 1,
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "lineNo",
          GridProps: {
            xs: 6,
            md: 6,
            sm: 6,
          },
        },
        {
          render: {
            componentType: "select",
          },
          name: "teamRole",
          label: "Team Role",
          //@ts-ignore
          options: API.getRoleListForLeadAssign,
          _optionsKey: "getRoleListForLeadAssign",
          required: true,
          validate: "getValidateValue",
          defaultValue: "00",
          GridProps: {
            xs: 6,
            md: 6,
            sm: 6,
          },
        },
        {
          render: {
            componentType: "select",
          },
          name: "teamUser",
          label: "Team User ID",
          dependentFields: ["teamRole"],
          //@ts-ignore
          options: API.getTeamRoleListForLeadAssign,
          _optionsKey: "getTeamRoleListForLeadAssign",
          required: true,
          defaultValue: "00",
          validate: "getValidateValue",
          disableCaching: true,
          GridProps: {
            xs: 6,
            md: 6,
            sm: 6,
          },
        },
      ],
    },
  ],
};
