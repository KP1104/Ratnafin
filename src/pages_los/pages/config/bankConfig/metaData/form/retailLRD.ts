export const retailLRDFormMetaData = {
  form: {
    name: "bankMasterRetailLRD",
    label: "Bank Master for Retail LRD",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: { xs: 12, sm: 4, md: 4 },
        container: { direction: "row", spacing: 2 },
      },
    },
    componentProps: {
      textField: { fullWidth: true },
      select: { fullWidth: true },
      datePicker: { fullWidth: true },
      numberFormat: { fullWidth: true },
      inputMask: { fullWidth: true },
    },
  },
  fields: [
    {
      render: { componentType: "autocomplete" },
      name: "branchID",
      label: "Name of Bank - Branch",
      placeholder: "Select Name of Bank - Branch",
      required: true,
      defaultValue: "00",
      options: "getBankBranchList",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "bankBranch",
      label: "Ratnaafin Branch",
      placeholder: "Ratnaafin Branch Select",
      defaultValue: "00",
      options: "getBranchList",
      multiple: true,
      enableVirtualized: true,
      showCheckbox: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "employeeCode",
      label: "Employement Type",
      defaultValue: "00",
      placeholder: "Employement Type",
      options: [
        {
          label: "Self Employed",
          value: "01",
        },
        {
          label: "Salaried",
          value: "02",
        },
      ],
      disableCaching: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "productId",
      label: "Product Name",
      placeholder: "Product Name",
      defaultValue: "12300003",
      options: "getProductTypeForBank",
      isReadOnly: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "subProduct1",
      label: "Sub Product 1",
      defaultValue: "00",
      placeholder: "Sub Product 1",
      dependentFields: ["productId"],
      options: "getBankSubProductType",
      disableCaching: true,
      multiple: true,
      showCheckbox: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "minAge",
      label: "Min Age",
      placeholder: "Min Age",
      type: "number",
      maxLength: 3,
      defaultValue: "0",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "maxAge",
      label: "Max Age",
      placeholder: "Max Age",
      type: "number",
      maxLength: 3,
      dependentFields: ["minAge"],
      defaultValue: "0",
      runValidationOnDependentFieldsChange: true,
      validate: {
        conditions: {
          all: [
            {
              fact: "dependentFields",
              path: "$.minAge.value",
              operator: "lessThanInclusiveString",
              value: { fact: "currentField", path: "$.value" },
            },
          ],
        },
        success: "",
        failure: "Max Age should be greate than Min Age.",
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "experience",
      label: "Total Experience",
      placeholder: "Total Experience",
      defaultValue: "00",
      options: "getExperianceyears",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "currency" },
      name: "rent",
      label: "Min Rent",
      placeholder: "Min Rent",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "creditScore",
      label: "Credit Score",
      placeholder: "Credit Score",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "propertyType",
      label: "Property Type",
      placeholder: "Property Type",
      dependentFields: ["productId"],
      defaultValue: "00",
      options: "getProductTypeForProductName",
      postValidationSetCrossFieldValues: "setLTVValue",
      disableCaching: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "currency" },
      name: "propertyValue",
      label: "Min Property Value",
      placeholder: "Min Property Value",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfIntWithoutValidation" },
      name: "maxLTV",
      label: "LTV Max",
      placeholder: "LTV Max",
      isReadOnly: true,
      required: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "currency" },
      name: "minLoanAmount",
      label: "Min Loan Amount",
      placeholder: "Min Loan Amount",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfIntWithoutValidation" },
      name: "minRate",
      label: "Min ROI",
      placeholder: "Min ROI",
      defaultValue: "0.00",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfIntWithoutValidation" },
      name: "maxRate",
      label: "Max ROI",
      placeholder: "Max ROI",
      defaultValue: "0.00",
      dependentFields: ["minRate"],
      runValidationOnDependentFieldsChange: true,
      validate: {
        conditions: {
          all: [
            {
              fact: "dependentFields",
              path: "$.minRate.value",
              operator: "lessThanInclusiveString",
              value: { fact: "currentField", path: "$.value" },
            },
          ],
        },
        success: "",
        failure:
          "Max ROI percentage should be greater than Min ROI percentage.",
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "minTenor",
      label: "Min Tenor (In Months)",
      placeholder: "Min Tenor (In Months)",
      maxLength: 3,
      type: "number",
      defaultValue: "0",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "maxTenor",
      label: "Max Tenor (In Months)",
      placeholder: "Max Tenor (In Months)",
      maxLength: 3,
      type: "number",
      dependentFields: ["minTenor"],
      defaultValue: "0",
      runValidationOnDependentFieldsChange: true,
      validate: {
        conditions: {
          all: [
            {
              fact: "dependentFields",
              path: "$.minTenor.value",
              operator: "lessThanInclusiveString",
              value: { fact: "currentField", path: "$.value" },
            },
          ],
        },
        success: "",
        failure: "Max Tenor should be greater than Min Tenor.",
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfIntWithoutValidation" },
      name: "fromPayoutRate",
      label: "From Rate of Payout",
      placeholder: "From Rate of Payout",
      defaultValue: "0.00",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfIntWithoutValidation" },
      name: "toPayoutRate",
      label: "To Rate of Payout",
      placeholder: "To Rate of Payout",
      GridProps: { xs: 12, md: 3, sm: 3 },
      defaultValue: "0.00",
      dependentFields: ["fromPayoutRate"],
      runValidationOnDependentFieldsChange: true,
      validate: {
        conditions: {
          all: [
            {
              fact: "dependentFields",
              path: "$.fromPayoutRate.value",
              operator: "lessThanInclusiveString",
              value: { fact: "currentField", path: "$.value" },
            },
          ],
        },
        success: "",
        failure:
          "To Rate of Payout should be greater than From Rate of Payout.",
      },
    },
  ],
};
