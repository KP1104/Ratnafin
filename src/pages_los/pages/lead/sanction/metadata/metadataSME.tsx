import { MetaDataType } from "components/dyanmicForm/types";

export const SMESanctionMetadata: MetaDataType = {
  form: {
    name: "sanction",
    label: "Sanction",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "Facility Details",
        1: "Other Details",
      },
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
        componentType: "arrayField",
        group: 0,
      },
      name: "facilityDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Facility Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "textField",
          },
          name: "facilityType",
          label: "Type of Facility",
          placeholder: "Type of Facility",
          maxLength: 20,
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
          },
          name: "sanctionAmount",
          label: "Amount of Sanction",
          placeholder: "Amount of Sanction",
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
            componentType: "rateOfIntWithoutValidation",
          },
          name: "processingFee",
          label: "Processing Fees",
          placeholder: "Processing Fees",
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
          },
          name: "fixedOrFloatingRate",
          label: "Floating Rate or Fixed Rate",
          placeholder: "Floating Rate or Fixed Rate",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "textField",
          },
          name: "baseRateName",
          label: "Name of the Base Rate",
          placeholder: "Name of the Base Rate",
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
          },
          name: "baseRate",
          label: "Rate %",
          placeholder: "Rate %",
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
          },
          name: "spreadInPercent",
          label: "Spread %",
          placeholder: "Spread %",
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
          },
          name: "actualROI",
          label: "Actual Rate of Interest",
          placeholder: "Actual Rate of Interest",
          dependentFields: ["baseRate", "spreadInPercent"],
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "textField",
          },
          name: "baseRateResetFreq",
          label: "Frequency of Reset of Base Rate",
          placeholder: "Frequency of Reset of Base Rate",
          maxLength: 10,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "textField",
          },
          name: "TenureIncaseOfTermloan",
          label: "Tenure in case of Term Loan",
          placeholder: "Tenure in case of Term Loan",
          maxLength: 5,
          showMaxLength: false,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "textField",
          },
          name: "MoratoriumPeriodInCaseOfTermloan",
          label: "Moratorium Period in case of Term Loan",
          placeholder: "Moratorium Period in case of Term Loan",
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
          },
          name: "prePaymentCharges",
          label: "Pre Payment Charges",
          placeholder: "Pre Payment Charges",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "bankName",
      label: "Bank Name",
      placeholder: "Bank Name",
      isReadOnly: true,
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
        componentType: "textField",
        group: 1,
      },
      name: "departmentName",
      label: "Departement Name",
      placeholder: "Department Name",
      maxLength: 50,
      showMaxLength: false,
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
      name: "bankerName",
      label: "Banker Name",
      placeholder: "Banker Name",
      maxLength: 50,
      showMaxLength: false,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "datePicker",
        group: 1,
      },
      name: "sanctionDate",
      label: "Date of Sanction",
      placeholder: "Date of Sanction",
      format: "dd/MM/yyyy",
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
        componentType: "textField",
        group: 1,
      },
      name: "guarantorNames",
      label: "Name of Guarantors",
      placeholder: "Name of Guarantors",
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
      name: "anyDeviationTakenByBank",
      label: "Deviation if any taken by Bank",
      placeholder: "Deviation if any taken by Bank",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "textField",
        group: 1,
      },
      name: "preDisbursementConditions",
      label: "Pre Disbursement Conditions",
      placeholder: "Pre Disbursement Conditions",
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
      name: "LCBGCommission",
      label: "LC / BG Comission",
      placeholder: "LC / BG Comission",
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
      name: "marginInCC",
      label: "Margin in CC",
      placeholder: "Margin in CC",
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
      name: "debtorsPercent",
      label: "% on Debtors",
      placeholder: "% on Debtors",
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
      name: "stockPercent",
      label: "% on Stock",
      placeholder: "% on Stock",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "textField",
        group: 1,
      },
      name: "marginInLCBG",
      label: "Margin in LC & BG",
      placeholder: "Margin in LC & BG",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "textField",
        group: 1,
      },
      name: "ATNWMaintained",
      label: "ATNW to be maintained at the end of Audited",
      placeholder: "ATNW to be maintained at the end of Audited",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "textField",
        group: 1,
      },
      name: "stockStatementSubmissionFreq",
      label: "Frequency of Stock Statement submission",
      placeholder: "Frequency of Stock Statement submission",
      maxLength: 5,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "datePicker",
        group: 1,
      },
      name: "submissionDateOfQIS",
      label: "Date of Submission of QIS",
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
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
        componentType: "textField",
        group: 1,
      },
      name: "anyAchievedMilestones",
      label: "Milestones to be Achieved",
      placeholder: "Milestones to be Achieved",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "datePicker",
        group: 1,
      },
      name: "nextRenewalDate",
      label: "Next Renewal Date",
      placeholder: "Next Renewal Date",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "textField",
        group: 1,
      },
      name: "additionalRemarks",
      label: "Additional Remarks",
      placeholder: "Additional Remarks",
      maxLength: 100,
      showMaxLength: false,
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
      name: "tranCD",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
};
