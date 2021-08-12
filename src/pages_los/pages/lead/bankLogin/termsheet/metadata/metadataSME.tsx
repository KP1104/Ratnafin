import { MetaDataType } from "components/dyanmicForm/types";
import { calculateActualRateofInte } from "../utils";
import {
  showFixedOrFloatingRateFields,
  showSelectionOfFixedOrFloatingRate,
  showTenureOrMoratoriumField,
  showDependentFieldsOfCC,
  showDependentFieldsOfLCBG,
  showDependentFieldsOfFundbase,
} from "../fns";

export const SMETermSheetMetadata: MetaDataType = {
  form: {
    name: "termsheet",
    label: "Termsheet",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "Facility Details",
        1: "Collateral Details",
        2: "Other Details",
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
          defaultValue: "00",
          required: true,
          validate: "getValidateValue",
          //@ts-ignore
          options: "getTermsheetSanctionFacilityType",
          disableCaching: true,
          runPostValidationHookAlways: true,
          //@ts-ignore
          postValidationSetCrossFieldValues: "setFacilityFundBaseValue",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "hidden",
          },
          name: "fundBaseType",
          label: "Fund base Type",
          placeholder: "Fund base Type",
          dependentFields: ["facilityType1"],
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
            componentType: "radio",
          },
          name: "fixedOrFloatingRate",
          label: "Floating Rate or Fixed Rate",
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
              value: "fixed",
            },
            { label: "Floating", value: "floating" },
          ],
          _optionsKey: "fixedOrFloatingRateOptions",
        },
        {
          render: {
            //@ts-ignore
            componentType: "rateOfIntWithoutValidation",
          },
          name: "baseRate",
          label: "Base Rate %",
          placeholder: "Base Rate %",
          dependentFields: ["facilityType", "fixedOrFloatingRate"],
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
          dependentFields: ["facilityType", "fixedOrFloatingRate"],
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
          dependentFields: ["facilityType", "fixedOrFloatingRate"],
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
          readOnly: true,
          dependentFields: [
            "baseRate",
            "spreadInPercent",
            "fixedOrFloatingRate",
            "facilityType",
          ],
          shouldExclude: showFixedOrFloatingRateFields,
          setValueOnDependentFieldsChange: calculateActualRateofInte,
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
            componentType: "textField",
          },
          name: "baseRateResetFreq",
          label: "Frequency of Reset of Base Rate",
          placeholder: "Frequency of Reset of Base Rate",
          dependentFields: ["facilityType", "fixedOrFloatingRate"],
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
          name: "tenure",
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
          name: "moratoriumPeriod",
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
            componentType: "rateOfIntWithoutValidation",
            group: 2,
          },
          name: "LCBGCommission",
          label: "LC / BG Comission",
          placeholder: "LC / BG Comission",
          dependentFields: ["facilityType"],
          shouldExclude: showDependentFieldsOfLCBG,
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
            group: 2,
          },
          name: "marginInStock",
          label: "Margin in Stock",
          placeholder: "Margin in Stock",
          dependentFields: ["facilityType"],
          shouldExclude: showDependentFieldsOfCC,
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
            group: 2,
          },
          name: "marginBookDebts",
          label: "Margin Book Debts",
          placeholder: "Margin Book Debts",
          dependentFields: ["facilityType"],
          shouldExclude: showDependentFieldsOfCC,
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
            group: 2,
          },
          type: "number",
          name: "daysOfDebtors",
          label: "No of Days of Debtors",
          placeholder: "No of Days of Debtors",
          dependentFields: ["facilityType"],
          shouldExclude: showDependentFieldsOfCC,
          maxLength: 3,
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
            group: 2,
          },
          name: "marginPercentOfFixedDeposit",
          label: "Margin Percentage of Fixed Deposit",
          placeholder: "Margin Percentage of Fixed Deposit",
          dependentFields: ["facilityType"],
          shouldExclude: showDependentFieldsOfLCBG,
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
            group: 2,
          },
          type: "number",
          name: "stockStatementSubmissionFreq",
          label: "Frequency of Stock Statement submission",
          placeholder: "Frequency of Stock Statement submission",
          dependentFields: ["fundBaseType"],
          shouldExclude: showDependentFieldsOfFundbase,
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
            componentType: "rateOfIntWithoutValidation",
          },
          name: "marginInCCBG",
          label: "Margin in CC & BG",
          placeholder: "Margin in CC & BG",
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
          label: "Owner of Colletral",
          placeholder: "Owner of Colletral",
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
        componentType: "hidden",
        group: 2,
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
        group: 2,
      },
      name: "bankName",
      label: "Bank Name",
      placeholder: "Bank Name",
      isReadOnly: true,
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "departmentName",
      label: "Bank Departement Name",
      placeholder: "Bank Department Name",
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
        group: 2,
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
        group: 2,
      },
      name: "termSheetDate",
      label: "Date of Term Sheet",
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
        componentType: "spacer",
        group: 2,
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
        componentType: "textField",
        group: 2,
      },
      name: "additionalRemarks",
      label: "Additional Remarks",
      placeholder: "Additional Remarks",
      maxLength: 100,
      showMaxLength: false,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
