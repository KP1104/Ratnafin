import { MetaDataType } from "components/dyanmicForm/types";
import { calculateActualRateofInte } from "../../bankLogin/termsheet/utils";
import {
  showFixedOrFloatingRateFields,
  showSelectionOfFixedOrFloatingRate,
  showTenureOrMoratoriumField,
} from "../../bankLogin/termsheet/fns";

export const CFSanctionMetadata: MetaDataType = {
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
        1: "Collateral Details",
        2: "Disbursement Tranches Details",
        3: "Escrow Sweep Details",
        4: "Other Details",
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
            componentType: "hidden",
          },
          name: "serialNo",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "select",
          },
          name: "facilityType",
          label: "Type of Facility",
          placeholder: "Type of Facility",
          options: [
            { label: "Term Loan", value: "TL" },
            { label: "Cash Credit", value: "CC" },
            { label: "LC/BG", value: "LCBG" },
            { label: "Fund Base", value: "FB" },
          ],
          defaultValue: "00",
          maxLength: 20,
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
            componentType: "toggleButtonGroup",
          },
          name: "fixedOrFloatingRate",
          label: "Rate Type",
          dependentFields: ["facilityType"],
          shouldExclude: showSelectionOfFixedOrFloatingRate,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          options: [
            {
              label: "Fixed",
              value: "FR",
            },
            { label: "Floating", value: "FLR" },
          ],
          exclusive: true,
        },
        {
          render: {
            //@ts-ignore
            componentType: "rateOfIntWithoutValidation",
          },
          name: "baseRate",
          label: "Base Rate %",
          placeholder: "Base Rate %",
          dependentFields: ["fixedOrFloatingRate", "facilityType"],
          shouldExclude: showFixedOrFloatingRateFields,
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
          dependentFields: ["fixedOrFloatingRate", "facilityType"],
          shouldExclude: showFixedOrFloatingRateFields,
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
            componentType: "rateOfIntWithoutValidation",
          },
          name: "spreadInPercent",
          label: "Spread %",
          placeholder: "Spread %",
          dependentFields: ["fixedOrFloatingRate", "facilityType"],
          shouldExclude: showFixedOrFloatingRateFields,
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
          dependentFields: [
            "baseRate",
            "spreadInPercent",
            "fixedOrFloatingRate",
            "facilityType",
          ],
          shouldExclude: showFixedOrFloatingRateFields,
          setValueOnDependentFieldsChange: calculateActualRateofInte,
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
          dependentFields: ["fixedOrFloatingRate", "facilityType"],
          shouldExclude: showFixedOrFloatingRateFields,
          maxLength: 5,
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
          label: "Tenure",
          placeholder: "Tenure",
          maxLength: 5,
          showMaxLength: false,
          dependentFields: ["facilityType"],
          shouldExclude: showTenureOrMoratoriumField,
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
          type: "number",
          label: "Moratorium Period",
          placeholder: "Moratorium Period",
          dependentFields: ["facilityType"],
          shouldExclude: showTenureOrMoratoriumField,
          maxLength: 5,
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
        componentType: "arrayField",
        group: 1,
      },
      name: "collateralDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Collateral Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
          },
          name: "collateralType",
          label: "Type of Collateral",
          placeholder: "Type of Collateral",
          maxLength: 20,
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
          },
          name: "collateralOwner",
          label: "Owner of Collateral",
          placeholder: "Owner of Collateral",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "squareFeetFormat",
          },
          name: "collateralArea",
          label: "Area of Colletral (Sq.Ft)",
          placeholder: "Area of Colletral (Sq.Ft)",
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
          name: "collateralCoverage",
          label: "Value of Collateral Coverage",
          placeholder: "Value of Collateral Coverage",
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
        componentType: "arrayField",
        group: 2,
      },
      name: "disbursementMileStoneDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Disbursement Tranches Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
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
          name: "disbursementSequence",
          label: "Disbursement Sequence",
          placeholder: "Disbursement Sequence (First,Second,Third)",
          GridProps: {
            xs: 12,
            md: 4,
            sm: 4,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "rateOfIntWithoutValidation",
          },
          name: "totalFeeAtDisbursementInPercent",
          label: "% of Total Fees at the time of Disbursement",
          placeholder: "% of Total Fees at the time of Disbursement",
          required: true,
          GridProps: {
            xs: 12,
            md: 4,
            sm: 4,
          },
        },
        {
          render: {
            componentType: "textField",
          },
          name: "description",
          label: "Description",
          placeholder: "Description",
          maxLength: 500,
          showMaxLength: false,
          GridProps: {
            xs: 12,
            md: 4,
            sm: 4,
          },
        },
      ],
    },
    {
      render: {
        componentType: "arrayField",
        group: 3,
      },
      name: "escrowSweepDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Escrow Sweep Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
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
          type: "number",
          name: "period",
          label: "Period",
          placeholder: "Period (In Months)",
          GridProps: {
            xs: 12,
            md: 4,
            sm: 4,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "currency",
            group: 3,
          },
          name: "collectionAmount",
          label: "Collection Amount",
          placeholder: "Collection Amount",
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
            group: 3,
          },
          name: "escrowSweepInPercent",
          label: "Escrow Sweep %",
          placeholder: "Escrow Sweep %",
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
        componentType: "hidden",
        group: 4,
      },
      name: "tranCD",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "bankName",
      label: "Bank Name",
      placeholder: "Bank Name",
      isReadOnly: true,
      maxLength: 50,
      showMaxLength: false,
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
        group: 4,
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
        group: 4,
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
        group: 4,
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
        componentType: "rateOfIntWithoutValidation",
        group: 4,
      },
      name: "securityCoverage",
      label: "Security Coverage",
      placeholder: "Security Coverage",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "select",
        group: 4,
      },
      name: "DSCRA",
      label: "DSCRA to be maintained if any",
      placeholder: "DSCRA to be maintained if any",
      //@ts-ignore
      options: "getYesOrNoOptions",
      defaultValue: "00",
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
        group: 4,
      },
      name: "DSCRAMonths",
      label: "DSCRA No of Months",
      placeholder: "No of Months",
      maxLength: 3,
      showMaxLength: false,
      dependentFields: ["DSCRA"],
      //@ts-ignore
      shouldExclude: (_, dependentFields) => {
        if (dependentFields["DSCRA"].value === "Y") {
          return false;
        }
        return true;
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
        componentType: "currency",
        group: 4,
      },
      name: "DSCRAAmount",
      label: "DSCRA Amount",
      placeholder: "DSCRA Amount",
      dependentFields: ["DSCRA"],
      //@ts-ignore
      shouldExclude: (_, dependentFields) => {
        if (dependentFields["DSCRA"].value === "Y") {
          return false;
        }
        return true;
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
        componentType: "currency",
        group: 4,
      },
      name: "keyManRiskPolicyAmount",
      label: "Amount of Key Man Risk Policy",
      placeholder: "Amount of Key Man Risk Policy",
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
        group: 4,
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
        componentType: "textField",
        group: 4,
      },
      name: "MIStoBankSubmissionFreq",
      label: "Frequency of Submission of MIS to Bank",
      placeholder: "Frequency of Submission of MIS to Bank",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "datePicker",
        group: 4,
      },
      name: "frquencyStartDate",
      label: "Frequency Start Date",
      placeholder: "DD/MM/YYYY",
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
        group: 4,
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
        group: 4,
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
        group: 4,
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
  ],
};
