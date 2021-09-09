export const assignPincodeFormMetaData = {
  form: {
    name: "addPincode",
    label: "Add Pincode",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: { xs: 12, sm: 12, md: 12 },
        container: { direction: "row", spacing: 2 },
      },
    },
    componentProps: {
      textField: { fullWidth: true },
      select: { fullWidth: true },
      datePicker: { fullWidth: true },
      timePicker: { fullWidth: true },
      numberFormat: { fullWidth: true },
      inputMask: { fullWidth: true },
    },
  },
  fields: [
    {
      render: { componentType: "select" },
      name: "branchCode",
      label: "Select Branch",
      placeholder: "Select Branch",
      options: "getBranchList",
      defaultValue: "00",
      required: true,
      validate: "getValidateValue",
      GridProps: { xs: 12, md: 12, sm: 12 },
    },
    {
      render: { componentType: "textField" },
      name: "pincode",
      label: "Enter Pincode",
      placeholder: "Enter Pincode",
      required: true,
      validate: "getValidateValue",
      GridProps: { xs: 12, md: 12, sm: 12 },
    },
  ],
};
