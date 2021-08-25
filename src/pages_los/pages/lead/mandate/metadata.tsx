import { MetaDataType } from "components/dyanmicForm/types";
import {
  calculateAmount,
  calculatePercentage,
  visaversaValidateValue,
} from "./fns";

export const mandateMetaData: MetaDataType = {
  form: {
    name: "mandate",
    label: "Mandate",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "Facility Details",
        1: "Disbursement Tranches Details",
        2: "Elite Services Charges Details",
        3: "Other Details",
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
        componentType: "dataTable",
        group: 0,
      },
      name: "facilityDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "serialNo",
      label: "Facility Details",
      rowValidator: "",
      dataTransformer: "",
      //@ts-ignore
      disableFooter: true,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _columns: [
        {
          accessor: "facilityType",
          alignment: "left",
          width: 100,
          Cell: "selectField",
          columnName: "Type of Facility",
          footer: false,
          defaultValue: "00",
          options: "getMandateFacilityType",
        },
        {
          accessor: "fundAmount",
          width: 200,
          Cell: "numberField",
          columnName: "Amount of Fund to be raised",
          defaultValue: "",
          displayStyle: "currency",
          alignment: "right",
          FormatProps: {
            thousandSeparator: true,
            prefix: "₹",
            thousandsGroupStyle: "lakh",
            allowNegative: true,
            allowLeadingZeros: false,
            decimalScale: 2,
            isAllowed: (values) => {
              if (values?.value?.length > 10) {
                return false;
              }
              if (values.floatValue === 0) {
                return false;
              }
              return true;
            },
          },
          clearFields: { fundFeeInAmount: "" },
        },
        {
          accessor: "fundFeeInAmount",
          alignment: "right",
          Cell: "visaversa",
          width: 150,
          columnName: "Fund Fee",
          ViceVersaProps: {
            leftTransform: calculateAmount,
            rightTransform: calculatePercentage,
            leftAdornment: "₹",
            rightAdornment: "%",
            dependentField: "fundAmount",
          },
          defaultValue: 0,
        },
      ],
    },

    {
      render: {
        componentType: "dataTable",
        group: 1,
      },
      name: "disbursementMileStoneDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "serialNo",
      label: "Disbursement Details",
      rowValidator: "",
      dataTransformer: "",
      //@ts-ignore
      disableFooter: true,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _columns: [
        {
          accessor: "disbursementSequence",
          width: 200,
          Cell: "textField",
          columnName: "Disbursement Sequence",
          defaultValue: "",
          footer: false,
          type: "number",
        },
        {
          accessor: "totalFeeAtDisbursementInPercent",
          width: 300,
          Cell: "numberField",
          columnName: "% of Total Fees at the time of Disbursement",
          defaultValue: "",
          alignment: "right",
          displayStyle: "percentage",
          FormatProps: {
            suffix: "%",
            decimalScale: 2,
            fixedDecimalScale: true,
            allowNegative: true,
            allowEmptyFormatting: true,
            isAllowed: (values) => {
              //@ts-ignore
              if (values.floatValue >= 999.99) {
                return false;
              }
              return true;
            },
          },
        },
        {
          accessor: "description",
          width: 200,
          Cell: "textField",
          columnName: "Description",
          defaultValue: "",
        },
      ],
    },
    {
      render: {
        componentType: "dataTable",
        group: 2,
      },
      name: "eliteServiceDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "serialNo",
      label: "Elite Services Details",
      rowValidator: "",
      dataTransformer: "",
      //@ts-ignore
      disableFooter: true,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _columns: [
        {
          accessor: "serviceName",
          width: 200,
          Cell: "selectField",
          columnName: "Elite Serivce Name",
          defaultValue: "00",
          footer: false,
          options: "getEliteSeviceName",
        },
        {
          accessor: "serviceChargeType",
          width: 300,
          Cell: "selectField",
          columnName: "Elite Services Charges Type",
          defaultValue: "00",
          options: "getEliteSeviceLumsumPer",
        },
        {
          accessor: "serviceCharge",
          width: 200,
          Cell: "numberField",
          columnName: "Elite Services Charges",
          defaultValue: "",
          alignment: "right",
          displayStyle: "currency",
          FormatProps: {
            thousandSeparator: true,
            prefix: "₹",
            thousandsGroupStyle: "lakh",
            allowNegative: true,
            allowLeadingZeros: false,
            decimalScale: 2,
            isAllowed: (values) => {
              if (values?.value?.length > 10) {
                return false;
              }
              if (values.floatValue === 0) {
                return false;
              }
              return true;
            },
          },
        },
        {
          accessor: "description",
          width: 200,
          Cell: "textField",
          columnName: "Description",
          defaultValue: "",
        },
      ],
    },
    {
      render: {
        componentType: "hidden",
        group: 3,
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
        //@ts-ignore
        componentType: "rateOfInt",
        group: 3,
      },
      name: "totalFeeAtSanctionInPercent",
      label: "% of Total Fees at the time of Sanction",
      placeholder: "% of Total Fees at the time of Sanction",
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
        componentType: "currency",
        group: 3,
      },
      name: "advanceAmount",
      label: "Advance Amount",
      placeholder: "Advance Amount",
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
        group: 3,
      },
      name: "anyBankAproached",
      label: "Bank to be approched mentioned",
      placeholder: "Bank to be approched mentioned",
      defaultValue: "00",
      required: true,
      validate: "getValidateValue",
      //@ts-ignore
      options: "getYesOrNoOptions",
      disableCaching: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "spacer",
        group: 3,
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: { componentType: "autocomplete", group: 3 },
      name: "bankNames",
      label: "Bank to be approched",
      placeholder: "Bank to be approched",
      required: true,
      //@ts-ignore
      options: "getPerfiosBankList",
      multiple: true,
      freeSolo: true,
      limitTags: -1,
      dependentFields: ["anyBankAproached"],
      shouldExclude: (_, dependentFields) => {
        if (dependentFields["anyBankAproached"].value === "Y") {
          return false;
        }
        return true;
      },
      GridProps: { xs: 12, md: 5, sm: 5 },
    },
  ],
};
