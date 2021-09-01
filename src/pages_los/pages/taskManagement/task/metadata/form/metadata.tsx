import {
  showTaskManagementFieldForInquiryID,
  showTaskManagementFieldForLeadID,
  postValidationSetRefID,
  getWorkerListForTaskManag,
  showOtherTaskTypeField,
} from "../../../fns";
export const taskAssignMetadata = {
  form: {
    name: "taskAssign",
    label: "Assign New Task",
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
      searchField: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: { componentType: "select" },
      name: "taskFor",
      label: "Task For",
      placeholder: "Task For",
      disableCaching: true,
      defaultValue: "00",
      options: "getTaskList",
    },
    {
      render: { componentType: "searchField" },
      name: "leadID",
      label: "Lead Number",
      placeholder: "Lead Number",
      dependentFields: ["taskFor"],
      shouldExclude: showTaskManagementFieldForLeadID,
      required: true,
      validate: "getValidateValue",
      searchComponent: "leadSearchComponent",
      postValidationSetCrossFieldValues: postValidationSetRefID,
    },
    {
      render: { componentType: "searchField" },
      name: "inquiryID",
      label: "Inquiry Number",
      placeholder: "Inquiry Number",
      dependentFields: ["taskFor"],
      shouldExclude: showTaskManagementFieldForInquiryID,
      required: true,
      validate: "getValidateValue",
      searchComponent: "inquirySearchComponent",
      postValidationSetCrossFieldValues: postValidationSetRefID,
    },
    {
      render: { componentType: "hidden" },
      name: "refID",
      label: "Ref ID",
    },
    {
      render: { componentType: "select" },
      name: "type",
      label: "Type",
      placeholder: "Type",
      options: "getTaskType",
      defaultValue: "00",
      required: true,
      validate: "getValidateValue",
    },
    {
      render: { componentType: "textField" },
      name: "othersType",
      label: "Other Type of Task",
      placeholder: "Other Type of Task",
      options: "getRetailEmployee",
      required: true,
      validate: "getValidateValue",
      dependentFields: ["type"],
      shouldExclude: showOtherTaskTypeField,
    },
    {
      render: { componentType: "textField" },
      name: "subject",
      label: "Subject",
      placeholder: "Subject",
      required: true,
      validate: "getValidateValue",
    },
    {
      render: { componentType: "datePicker" },
      name: "dueDate",
      label: "Due Date",
      format: "dd/MM/yyyy",
      placeholder: "DD/MM/YYYY",
      required: true,
    },
    {
      render: { componentType: "autocomplete" },
      name: "worker",
      label: "Assign To",
      defaultValue: "00",
      required: true,
      dependentFields: ["taskFor", "refID"],
      validate: "getValidateValue",
      options: getWorkerListForTaskManag,
      disableCaching: true,
      enableVirtualized: true,
    },
    {
      render: { componentType: "hidden" },
      name: "status",
      defaultValue: "01",
    },
    {
      render: { componentType: "textField" },
      name: "description",
      label: "Description",
      multiline: true,
      rowsMax: 4,
      rows: 3,
      placeholder: "Description",
    },
  ],
};
