import { MetaDataType } from "components/dyanmicForm/types";
import {
  applicantMonthlySalaryFieldShow,
  applicantFilingDetailsFieldShow,
  coApplicantMonthlySalaryFieldShow,
  coApplicantFilingDetailsFieldShow,
  calculateApplicantIncome,
  calculateApplicantCoApplcantTotalIncome,
  calculateCoApplicantIncome,
  calculateTotalObligation,
} from "../../fns";

export const EligibilityCalculatorHLBusinessOrProfessional: MetaDataType = {
  form: {
    name: "eligibilityCalculatorHLBusinessProfessional",
    label: "Eligibility Calculator",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "stepper",
      groups: { 0: "Income Details", 1: "Eligibility Details" },
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
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "loanAmount",
      label: "Loan Amount",
      placeholder: "Loan Amount",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "typography",
        group: 0,
      },
      name: "applicantIncomeDeails",
      label: "Applicant Income Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "employementType",
      label: "Employement Type",
      placeholder: "Employement Type",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "hidden",
        group: 0,
      },
      name: "employementCode",
      label: "Employement Code",
      placeholder: "Employement Code",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "obligation",
      label: "Obligation",
      placeholder: "Obligation",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "spacer",
        group: 0,
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "previousAnnualNetProfit",
      label: "Previous Filing Year Annual Net Profit",
      placeholder: "Previous Filing Year Annual Net Profit",
      dependentFields: ["employementType"],
      shouldExclude: applicantFilingDetailsFieldShow,
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "currentAnnualNetProfit",
      label: "Current Filing Year Annual Net Profit",
      placeholder: "Current Filing Year Annual Net Profit",
      dependentFields: ["employementType"],
      shouldExclude: applicantFilingDetailsFieldShow,
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "applicantIncome",
      label: "Applicant Income",
      placeholder: "Applicant Income",
      dependentFields: [
        "employementType",
        "previousAnnualNetProfit",
        "currentAnnualNetProfit",
        "applicantIncome",
        "monthlyIncome",
        "coApplicantIncome",
        "coApplicantMonthlyIncome",
      ],
      shouldExclude: applicantFilingDetailsFieldShow,
      setValueOnDependentFieldsChange: calculateApplicantIncome,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "typography",
        group: 0,
      },
      name: "coApplicantIncomeDeails",
      label: "CO-Applicant Income Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "select",
        group: 0,
      },
      name: "coApplicantEmployement",
      label: "Employement Type",
      placeholder: "Employement Type",
      //@ts-ignore
      options: [
        { label: "Salaried", value: "02" },
        { label: "Self Employee", value: "01" },
      ],
      defaultValue: "00",
      disableCaching: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "coApplicantObligation",
      label: "Obligation",
      placeholder: "Obligation",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "spacer",
        group: 0,
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "coApplicantMonthlyIncome",
      label: "Monthly Income",
      placeholder: "Monthly Income",
      dependentFields: ["coApplicantEmployement"],
      shouldExclude: coApplicantMonthlySalaryFieldShow,
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "coApplicantPreviousAnnualNetProfit",
      label: "Previous Filing Year Annual Net Profit",
      placeholder: "Previous Filing Year Annual Net Profit",
      dependentFields: ["coApplicantEmployement"],
      shouldExclude: coApplicantFilingDetailsFieldShow,
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "coApplicantCurrentAnnualNetProfit",
      label: "Current Filing Year Annual Net Profit",
      placeholder: "Current Filing Year Annual Net Profit",
      dependentFields: ["coApplicantEmployement"],
      shouldExclude: coApplicantFilingDetailsFieldShow,
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "coApplicantIncome",
      label: "Co-Applicant Income",
      placeholder: "Co-Applicant Income",
      dependentFields: [
        "coApplicantEmployement",
        "coApplicantPreviousAnnualNetProfit",
        "coApplicantCurrentAnnualNetProfit",
      ],
      shouldExclude: coApplicantFilingDetailsFieldShow,
      setValueOnDependentFieldsChange: calculateCoApplicantIncome,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 1,
      },
      name: "totalIncome",
      label: "Total Income",
      placeholder: "Total Income",
      isReadOnly: true,
      dependentFields: [
        "employementCode",
        "coApplicantEmployement",
        "applicantIncome",
        "monthlyIncome",
        "coApplicantIncome",
        "coApplicantMonthlyIncome",
      ],
      setValueOnDependentFieldsChange: calculateApplicantCoApplcantTotalIncome,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 1,
      },
      name: "totalActualObligations",
      label: "Total Obligations",
      placeholder: "Total Obligations",
      isReadOnly: true,
      dependentFields: ["obligation", "coApplicantObligation"],
      setValueOnDependentFieldsChange: calculateTotalObligation,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "typography",
        group: 1,
      },
      name: "loanAmountBasedFOIRTypography",
      label: "Loan Amount Based on FOIR",
      TypographyProps: {
        style: {
          font: "initial",
        },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 1,
      },
      name: "propertyMarketValue",
      label: "Property Market Value",
      placeholder: "Property Market Value",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      type: "text",
      name: "tenur",
      label: "Tenure (In Months)",
      placeholder: "Tenure (In Months)",
      FormatProps: {
        format: "#####",
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
        group: 1,
      },
      name: "rate",
      label: "Rate",
      placeholder: "Rate",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfIntWithoutValidation",
        group: 1,
      },
      name: "foir",
      label: "FOIR",
      placeholder: "FOIR",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "condition",
      type: "text",
      label: "Condition",
      placeholder: "Condition",
      isReadOnly: true,
      dependentFields: ["newltvCondition", "newltv", "clfr"],
      setValueOnDependentFieldsChange: "retailCalculateSENPCondition",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfIntWithoutValidation",
        group: 1,
      },
      name: "newltvCondition",
      label: "LTV Condition",
      placeholder: "LTV Condition",
      dependentFields: ["propertyMarketValue"],
      setValueOnDependentFieldsChange: "retailCalculateNewLTVCondition",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfIntWithoutValidation",
        group: 1,
      },
      name: "newltv",
      label: "New LTV",
      placeholder: "New LTV",
      dependentFields: ["propertyMarketValue", "loanAmountBasedOnFOIR"],
      setValueOnDependentFieldsChange: "retailCalculateSENPNewLTV",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfIntWithoutValidation",
        group: 1,
      },
      name: "clfr",
      label: "CLFR",
      placeholder: "CLFR",
      isReadOnly: true,
      dependentFields: ["newltv", "foir"],
      setValueOnDependentFieldsChange: "retailCalcualteSENPCLFR",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "hidden",
        group: 1,
      },
      name: "eligibleEMI",
      dependentFields: ["totalIncome", "foir", "totalActualObligations"],
      setValueOnDependentFieldsChange: "retailCalcualteSENPEligibleEMI",
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 1,
      },
      name: "loanAmountBasedOnFOIR",
      label: "Loan Amount Based On FOIR",
      placeholder: "Loan Amount Based On FOIR",
      dependentFields: ["condition", "tenur", "rate", "eligibleEMI"],
      setValueOnDependentFieldsChange: "retailCalculateLoanAmountBasedOnFOIR",
      shouldExclude: "ShouldExcludeShowLoanAmountBasedFOIR",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "hidden",
        group: 1,
      },
      name: "loanAmountBasedOnFOIRCondition",
      dependentFields: ["condition", "loanAmountBasedOnFOIR"],
      setValueOnDependentFieldsChange:
        "retailCalculateSENPLoanAmountBasedOnFOIRCondition",
    },
    {
      render: {
        componentType: "typography",
        group: 1,
      },
      name: "loanAmountConditionLTVTypography",
      label: "Loan Amount Based on LTV",
      TypographyProps: {
        style: {
          font: "initial",
        },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      type: "text",
      name: "loanAmountCondition",
      label: "Loan Amount Condition",
      placeholder: "Loan Amount Condition",
      dependentFields: ["propertyMarketValue"],
      setValueOnDependentFieldsChange: "retailCalculateSENPLoanAmountCondition",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfIntWithoutValidation",
        group: 1,
      },
      name: "ltv",
      label: "LTV",
      placeholder: "LTV",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "ltvCondition",
      type: "text",
      label: "Condition",
      placeholder: "Condition",
      dependentFields: ["ltv", "newltvCondition", "newclfr"],
      setValueOnDependentFieldsChange: "retailCalculateSENPltvCondition",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfIntWithoutValidation",
        group: 1,
      },
      name: "newclfr",
      label: "CLFR",
      placeholder: "CLFR",
      isReadOnly: true,
      dependentFields: ["ltv", "newfoir"],
      setValueOnDependentFieldsChange: "retailCalculateSENPNewCLFR",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "hidden",
        group: 1,
      },
      name: "amount",
      dependentFields: ["propertyMarketValue", "ltv"],
      setValueOnDependentFieldsChange: "retailCalculateSENPAmount",
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfIntWithoutValidation",
        group: 1,
      },
      name: "newfoir",
      label: "FOIR",
      placeholder: "FOIR",
      dependentFields: [
        "rate",
        "tenur",
        "amount",
        "totalActualObligations",
        "totalIncome",
      ],
      setValueOnDependentFieldsChange: "retailCalculateSENPNewFOIR",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 1,
      },
      name: "loanAmountBasedOnLTV",
      label: "Loan Amount Based On LTV",
      placeholder: "Loan Amount Based On LTV",
      dependentFields: ["ltvCondition", "amount"],
      setValueOnDependentFieldsChange:
        "retailCalculateSENPLoanAmountBasedOnLTV",
      shouldExclude: "ShouldExcludeShowLoanAmountBasedLTV",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "typography",
        group: 1,
      },
      name: "eligibilityLoanAmountTypography",
      label: "Eligibility",
      TypographyProps: {
        style: {
          font: "initial",
        },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 1,
      },
      name: "eligibleLoanAmount",
      label: "Eligible Loan Amount",
      placeholder: "Eligible Loan Amount",
      dependentFields: [
        "loanAmount",
        "loanAmountBasedOnFOIRCondition",
        "loanAmountBasedOnLTV",
      ],
      setValueOnDependentFieldsChange: "retailCalculateSENPEligibleLoanAmount",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 1,
      },
      name: "finalEligibleEMI",
      label: "Eligible EMI",
      placeholder: "Eligible EMI",
      isReadOnly: true,
      dependentFields: ["rate", "tenur", "eligibleLoanAmount"],
      setValueOnDependentFieldsChange: "retailCalculateSalariedEligibleEMI",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
