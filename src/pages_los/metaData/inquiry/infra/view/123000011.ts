export const infra_123000011 = {
  form: {
    name: "123000011",
    label: "Construction Finance",
    validationRun: "onBlur",
    render: {
      ordering: "sequence",
      renderType: "stepper",
      groups: {
        "0": "Personal Details",
        "1": "Contact Details",
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "productType",
      sequence: 1,
      label: "Product Type",
      placeholder: "Product Type",
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: "getProductType",
      fullWidth: true,
      validate: "getValidateValue",
      isReadOnly: false,
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "salutation",
      sequence: 5,
      label: "Salutation",
      placeholder: "Salutation",
      isReadOnly: false,
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: "getSalutation",
      validate: "getValidateValue",
      postValidationSetCrossFieldValues: "getGenderValue",
      fullWidth: true,
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "firstName",
      sequence: 6,
      type: "text",
      label: "First Name[As Per PAN Card]",
      isReadOnly: false,
      required: true,
      placeholder: "First Name[As Per PAN Card]",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      maxLength: 50,
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "middleName",
      sequence: 7,
      type: "text",
      label: "Middle Name",
      isReadOnly: false,
      placeholder: "Middle Name",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      maxLength: 50,
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "lastName",
      sequence: 8,
      type: "text",
      label: "Last Name",
      isReadOnly: false,
      required: true,
      placeholder: "Last Name",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      maxLength: 50,
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "gender",
      sequence: 9,
      label: "Gender",
      placeholder: "Gender",
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: "getGenderList",
      validate: "getValidateValue",
      isReadOnly: false,
      fullWidth: true,
    },
    {
      render: {
        componentType: "dob",
        group: 0,
      },
      name: "dob",
      sequence: 10,
      label: "Date Of Birth",
      placeholder: "dd/mm/yyyy",
      isReadOnly: false,
      required: true,
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validationRun: "all",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
        ],
      },
      fullWidth: true,
    },
    {
      render: {
        componentType: "currencyWithLeadingZeros",
        group: 0,
      },
      name: "loanAmount",
      sequence: 11,
      type: "text",
      label: "Your Desired Loan Amount",
      isReadOnly: false,
      required: true,
      placeholder: "Your Desired Loan Amount",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validationRun: "onChange",
      validate: "validateLoanAmount",
      fullWidth: true,
    },
    {
      render: {
        componentType: "phoneNumber",
        group: 1,
      },
      name: "mobileNo",
      sequence: 12,
      type: "text",
      label: "Mobile No",
      isReadOnly: false,
      required: true,
      placeholder: "Mobile No",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
          {
            name: "min",
            params: [10, "Mobile No should be 10 digit."],
          },
          {
            name: "max",
            params: [10, "Mobile No should be 10 digit."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      StartAdornment: "+91",
      fullWidth: true,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "email",
      sequence: 13,
      type: "text",
      label: "Email",
      isReadOnly: false,
      required: true,
      placeholder: "Email",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
          {
            name: "email",
            params: ["Please enter valid Email ID."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      maxLength: 100,
    },
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "employementStatus",
      sequence: 13,
      label: "How Are You Currently Employed",
      placeholder: "How Are You Currently Employed",
      isReadOnly: false,
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: "getInfraEmployee",
      validate: "getValidateValue",
      fullWidth: true,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "landmark",
      sequence: 15,
      type: "text",
      label: "Landmark",
      isReadOnly: false,
      required: false,
      placeholder: "Landmark",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      maxLength: 100,
    },
    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "pincode",
      sequence: 15,
      label: "Residence Pincode",
      required: true,
      placeholder: "Residence Pincode",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
          {
            name: "min",
            params: [6, "Residence Pincode should be 6 digit."],
          },
          {
            name: "max",
            params: [6, "Residence Pincode should be 6 digit."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      postValidationSetCrossFieldValues: "postValidationSetPincodeDtl",
      fullWidth: true,
      isReadOnly: false,
      runPostValidationHookAlways: true,
    },
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "location",
      sequence: 17,
      defaultValue: "00",
      label: "Location",
      isReadOnly: false,
      required: true,
      placeholder: "Location",
      postValidationSetCrossFieldValues: "postValidationSetLocationDtl",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      validate: "getValidateValue",
      dependentFields: ["pincode"],
      options: "getPincode",
      disableCaching: true,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "city",
      sequence: 18,
      label: "City",
      required: true,
      isReadOnly: false,
      placeholder: "City",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      maxLength: 100,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "district",
      sequence: 19,
      label: "District",
      isReadOnly: true,
      placeholder: "District",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "state",
      sequence: 20,
      label: "State",
      isReadOnly: true,
      placeholder: "State",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "country",
      sequence: 21,
      label: "Country",
      isReadOnly: true,
      placeholder: "Country",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "subProductType",
      sequence: 2,
      label: "Sub Product Type",
      placeholder: "Sub Product Type",
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      validate: "getValidateValue",
      dependentFields: ["productType"],
      shouldExclude: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.productType.value",
              operator: "equal",
              value: "123400021",
            },
            {
              fact: "dependentFields",
              path: "$.productType.value",
              operator: "equal",
              value: "123400022",
            },
          ],
        },
        success: false,
        failure: true,
      },
      disableCaching: true,
      options: "getCRMSubProductType",
    },
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "youAre",
      sequence: 22,
      label: "You are",
      placeholder: "You are",
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: "getYouAre",
      fullWidth: true,
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "address",
      sequence: 13.2,
      type: "text",
      label: "Address",
      required: false,
      placeholder: "Address",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      maxLength: 200,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "firmName",
      sequence: 13.1,
      type: "text",
      label: "Firm Name As per records",
      placeholder: "Firm Name",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      fullWidth: true,
      required: true,
      maxLength: 150,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["This Field is required."],
          },
        ],
      },
    },
  ],
};
