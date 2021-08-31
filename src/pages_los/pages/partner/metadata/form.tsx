import { MetaDataType } from "components/dyanmicForm/types";
import {
  becomePartner,
  becomePartnerIndividual,
  becomePartnerNominee,
} from "../fns";

export const becomePartnerMetaData: MetaDataType = {
  form: {
    name: "becomePartner",
    label: "Become a Partner",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "",
    refID: "3434",
    render: {
      ordering: "auto",
      renderType: "simple",
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
        componentType: "toggleButtonGroup",
        group: 0,
      },
      name: "partnerType",
      label: "Partner Type",
      defaultValue: "I",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: [
        {
          label: "Individual",
          value: "I",
          iconName: "person",
        },
        { label: "Corporate", value: "C", iconName: "business" },
      ],
      exclusive: true,
    },

    {
      render: {
        componentType: "spacer",
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      HiddenProps: {
        smDown: true,
      },
    },
    {
      render: {
        componentType: "typography",
      },
      name: "personalInfo",
      label: "Personal Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "salutation",
      label: "Title",
      placeholder: "Select Salutation",
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getSalutation",
      runPostValidationHookAlways: true,
      validate: "getValidateValue",
    },

    {
      render: {
        componentType: "textField",
      },
      name: "firstname",
      type: "text",
      label: "First Name[As Per PAN Card]",
      placeholder: "First Name[As Per PAN Card]",
      required: true,
      //@ts-ignore
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
      },
      name: "middlename",
      label: "Middle Name",
      placeholder: "Middle Name",
      type: "text",
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
      name: "lastname",
      label: "Last Name",
      placeholder: "Last Name",
      required: true,
      type: "text",
      //@ts-ignore
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
        componentType: "dob",
      },
      name: "birthDate",
      label: "Date Of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",

      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partnerType"],
      shouldExclude: becomePartnerIndividual,
    },

    {
      render: {
        componentType: "datePicker",
      },
      name: "marriedDate",
      label: "Marriage Anniversary",
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "typography",
      },
      name: "addressInfo",
      label: "Address Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "address",
      label: "Address",
      placeholder: "Enter address",
      required: true,
      type: "text",
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
      },
      name: "landmark",
      label: "Landmark",
      placeholder: "Landmark",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "pincode",
      },
      name: "pincode",
      label: "Residence Pincode",
      placeholder: "Residence pincode",
      required: true,
      validate: "getValidateValue",
      runPostValidationHookAlways: true,
      //@ts-ignore
      postValidationSetCrossFieldValues: "postValidationSetPincodeDtl",
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
      name: "location",
      label: "Location",
      placeholder: "Location",
      dependentFields: ["pincode"],
      required: true,
      validate: "getValidateValue",
      //@ts-ignore
      options: "getPincode",
      defaultValue: "00",
      //@ts-ignore
      postValidationSetCrossFieldValues: "postValidationSetLocationDtl",
      disableCaching: true,
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
      name: "city",
      label: "City",
      placeholder: "City",
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
      name: "district",
      label: "District",
      placeholder: "District",
      isReadOnly: true,
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
      name: "state",
      label: "State",
      placeholder: "State",
      isReadOnly: true,
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
      name: "country",
      label: "Country",
      placeholder: "Country",
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
      },
      name: "idPhoneInfo",
      label: "ID & Phone Number Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "phoneNumber",
      },
      name: "mobile",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile number",
      required: true,
      StartAdornment: "+91",
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
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Email is required"] },
          { name: "email", params: ["Not a valid email"] },
        ],
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
        componentType: "panCard",
      },
      name: "panNo",
      type: "text",
      label: "Pan Card Number",
      placeholder: "PAN Card number",
      required: true,
      validate: "validatePanNumber",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "typography",
      },
      name: "bankInfo",
      label: "Bank & Company Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "ifscCode",
      label: "IFSC Code",
      placeholder: "IFSC code",
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
      },
      name: "bankName",
      type: "text",
      label: "Bank Name",
      placeholder: "Bank name",
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
        componentType: "select",
      },
      name: "bankAcctType",
      label: "Bank Account Type",
      placeholder: "A/C type",
      required: true,
      defaultValue: "00",
      //@ts-ignore
      options: "getAccountType",
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
      },
      name: "acctNo",
      type: "text",
      label: "Bank Account No",
      placeholder: "A/C number",
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
      },
      name: "acctHoldrName",
      type: "text",
      label: "Account Holder Name",
      placeholder: "A/C holder name",
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
      },
      name: "gstNo",
      type: "text",
      label: "GST No",
      placeholder: "Enter GST number",
      required: true,
      defaultValue: "",
      //@ts-ignore
      validate: "getValidateValue",
      runPostValidationHookAlways: true,
      //need to move in LOS
      //@ts-ignore
      postValidationSetCrossFieldValues: "getCompanyNameFromGST",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partnerType"],
      shouldExclude: becomePartner,
    },

    {
      render: {
        componentType: "textField",
      },
      name: "legalEntityName",
      type: "text",
      label: "Company Name",
      placeholder: "Company Name",
      required: true,
      //@ts-ignore
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partnerType"],
      shouldExclude: becomePartner,
    },

    {
      render: {
        componentType: "datePicker",
      },
      name: "inceptionDate",
      label: "Date of Incorporation",
      // required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partnerType"],
      shouldExclude: becomePartner,
    },

    {
      render: {
        componentType: "typography",
      },
      name: "otherInfo",
      label: "Other Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "educationQualifi",
      label: "Education Qualification",
      placeholder: "Education qualification",
      required: true,
      defaultValue: "00",
      //@ts-ignore
      options: "getEducationDtl",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partnerType"],
      shouldExclude: becomePartnerIndividual,
    },

    {
      render: {
        componentType: "select",
      },
      name: "idcType",
      label: "Type of IDC",
      placeholder: "Type of IDC",
      required: true,
      defaultValue: "00",
      //@ts-ignore
      options: "getIDCType",
      validate: "getValidateValue",
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
      name: "primaryBusiIntrest",
      label: "Primary Business Interest",
      placeholder: "Primary business interest",
      required: true,
      defaultValue: "00",
      multiple: true,
      showCheckbox: true,
      //@ts-ignore
      options: "getBusinessInterest",
      validate: "getValidateValue",
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
      name: "primaryProduct",
      label: "Primary Category",
      placeholder: "Primary Category",
      required: true,
      defaultValue: "00",
      disableCaching: true,
      //@ts-ignore
      options: "getPrimaryPartnerProduct",
      validate: "getValidateValue",
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
      name: "secondaryProduct",
      label: "Secondry Category",
      placeholder: "Secondry Category",
      defaultValue: "00",
      multiple: true,
      showCheckbox: true,
      disableCaching: true,
      dependentFields: ["primaryProduct"],
      //@ts-ignore
      options: "getSecondaryPartnerProduct",
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
      name: "occupation",
      label: "Current Occupation",
      placeholder: "Current Occupation",
      defaultValue: "00",
      //@ts-ignore
      options: "getOccupation",
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
      name: "nomineeFlag",
      label: "Do you want to add Nominee Details",
      placeholder: "Add nominee",
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getYesOrNoOptions",
      dependentFields: ["partnerType"],
      shouldExclude: becomePartnerIndividual,
      runPostValidationHookAlways: true,
    },

    {
      render: {
        componentType: "textField",
      },
      name: "nomineeName",
      type: "text",
      label: "Nominee Name",
      placeholder: "Nominee name",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validate: "getValidateValue",
      dependentFields: ["nomineeFlag", "partnerType"],
      shouldExclude: becomePartnerNominee,
    },

    {
      render: {
        //@ts-ignore
        componentType: "dob",
      },
      name: "nomiBirthDate",
      label: "Date of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["nomineeFlag", "partnerType"],
      shouldExclude: becomePartnerNominee,
    },

    {
      render: {
        componentType: "select",
      },
      name: "nomiRelation",
      label: "Relationship",
      placeholder: "relationship with nominee",
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getRelationship",
      validate: "getValidateValue",
      dependentFields: ["nomineeFlag", "partnerType"],
      shouldExclude: becomePartnerNominee,
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "nomineeMobile",
      type: "text",
      label: "Mobile No",
      placeholder: "Nomineee mobile number",

      FormatProps: {
        format: "##########",
        isAllowed: (values) => {
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },

      StartAdornment: "+91",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["nomineeFlag", "partnerType"],
      shouldExclude: becomePartnerNominee,
    },
  ],
};
