export const unsecureFormMetaData = {
  form: {
    name: "bankMasterUnsecured",
    label: "Bank Master for Unsecure",
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
      name: "bankTranCode",
      label: "Name of Bank",
      placeholder: "Select Name of Bank",
      required: true,
      defaultValue: "00",
      options: "getBankList",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "branchName",
      label: "Branch Name",
      placeholder: "Branch Name",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "productId",
      label: "Product Name",
      placeholder: "Product Name",
      defaultValue: "00",
      options: "getProductTypeForBank",
      multiple: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "minAge" },
      name: "minAge",
      label: "Min Age",
      placeholder: "Min Age",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "maxAge" },
      name: "maxAge",
      label: "Max Age",
      placeholder: "Max Age",
      dependentFields: ["minAge"],
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
      render: { componentType: "textField" },
      name: "experience",
      label: "Total Experience",
      placeholder: "Total Experience",
      maxLength: 3,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "typeOfIndustry",
      label: "Industry",
      placeholder: "Industry",
      options: "getIndustryType",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "subTypeOfIndustry",
      label: "Industry Type",
      dependentFields: ["typeOfIndustry"],
      placeholder: "Industry Type",
      options: "getIndustrySubType",
      disableCaching: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "currency" },
      name: "minTurnOver",
      label: "Turnover Min (in Lakh)",
      placeholder: "Turnover Min (in Lakh)",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "currency" },
      name: "annualNetIncome",
      label: "Annual Net Income",
      placeholder: "Annual Net Income",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "creditScore",
      label: "Credit Score",
      placeholder: "Credit Score",
      maxLength: 3,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "cmrCreditScore",
      label: "Credit Score (CMR)",
      placeholder: "Credit Score (CMR)",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfInt" },
      name: "chequeBouncesPercentage",
      label: "% of Cheque Bouuces",
      placeholder: "% of Cheque Bouuces",
      required: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "currency" },
      name: "minLoanAmount",
      label: "Loan Amount (Min) (in Lakh)",
      placeholder: "Loan Amount (Min) (in Lakh)",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "currency" },
      name: "maxLoanAmount",
      label: "Loan Amount (Max) (in Lakh)",
      placeholder: "Loan Amount (Max) (in Lakh)",
      dependentFields: ["minLoanAmount"],
      validate: {
        conditions: {
          all: [
            {
              fact: "dependentFields",
              path: "$.minLoanAmount.value",
              operator: "lessThanInclusiveString",
              value: { fact: "currentField", path: "$.value" },
            },
          ],
        },
        success: "",
        failure: "Loan Amount Max should be greater than Loan Amount Min.",
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfInt" },
      name: "minRate",
      label: "ROI(Min)",
      placeholder: "ROI(Min)",
      required: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfInt" },
      name: "maxRate",
      label: "ROI(Max)",
      placeholder: "ROI(Max)",
      required: true,
      dependentFields: ["minRate"],
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
          "ROI Max percentage should be greater than ROI Min percentage.",
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "minTenor",
      label: "Tenor (Min)",
      placeholder: "Tenor (Min)(In Years Only)",
      maxLength: 3,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "maxTenor",
      label: "Tenor (Max)",
      placeholder: "Tenor (Max)(In Years Only)",
      maxLength: 3,
      dependentFields: ["minTenor"],
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
        failure: "Tenor Max should be greater than Tenor Min.",
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "select" },
      name: "weHavePayout",
      label: "Whether We have Payout?",
      placeholder: "Whether We have Payout?",
      options: "getYesOrNoOptions",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfInt" },
      name: "fromPayoutRate",
      label: "From Rate of Payout",
      placeholder: "From Rate of Payout",
      required: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "rateOfInt" },
      name: "toPayoutRate",
      label: "To Rate of Payout",
      placeholder: "To Rate of Payout",
      required: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
  ],
};
