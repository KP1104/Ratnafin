export const retail_12300003 = {
  form: {
    name: "12300003",
    label: "Retail LRD - Lease Rental Discounting",
    validationRun: "onBlur",
    render: {
      renderType: "stepper",
      groups: { "0": "Personal Details", "1": "Contact Details" },
    },
  },
  fields: [
    {
      render: { componentType: "select", group: 0 },
      name: "source",
      sequence: 1,
      label: "Source",
      placeholder: "Source",
      defaultValue: "1",
      GridProps: { xs: 12, md: 3, sm: 3 },
      options: "getSourcelist",
      fullWidth: true,
      required: true,
      validate: "getValidateValue",
      disableCaching: true,
      __VIEW__: { isReadOnly: true },
      __EDIT__: { isReadOnly: true },
    },
    {
      render: { componentType: "autocomplete", group: 0 },
      name: "employeeUserName",
      sequence: 2,
      label: "Select Employee",
      placeholder: "Select Employe",
      defaultValue: "00",
      required: true,
      dependentFields: ["source"],
      options: "getAllRegisteredUsersList",
      disableCaching: true,
      enableVirtualized: true,
      fullWidth: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
      validate: "getValidateValue",
      shouldExclude: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.source.value",
              operator: "equal",
              value: "3",
            },
          ],
        },
        success: false,
        failure: true,
      },
      __VIEW__: { isReadOnly: true },
      __EDIT__: { isReadOnly: true },
    },
    {
      render: { componentType: "autocomplete", group: 0 },
      name: "partnerUserName",
      placeholder: "Select IDC",
      label: "Select IDC",
      defaultValue: "00",
      sequence: 3,
      dependentFields: ["source"],
      options: "getPartnerList",
      required: true,
      disableCaching: true,
      enableVirtualized: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
      shouldExclude: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.source.value",
              operator: "equal",
              value: "4",
            },
          ],
        },
        success: false,
        failure: true,
      },
      fullWidth: true,
      validate: "getValidateValue",
      __VIEW__: { isReadOnly: true },
      __EDIT__: { isReadOnly: true },
    },
    {
      render: { componentType: "textField", group: 0 },
      name: "otherDescription",
      sequence: 4,
      label: "Reference",
      placeholder: "Reference",
      defaultValue: "",
      dependentFields: ["source"],
      maxLength: 100,
      GridProps: { xs: 12, md: 3, sm: 3 },
      shouldExclude: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.source.value",
              operator: "equal",
              value: "1",
            },
          ],
        },
        success: false,
        failure: true,
      },
      fullWidth: true,
      __VIEW__: { isReadOnly: true },
      __EDIT__: { isReadOnly: true },
    },
    {
      render: { componentType: "select", group: 0 },
      name: "productType",
      sequence: 1,
      label: "Product Type",
      placeholder: "Product Type",
      __VIEW__: { isReadOnly: false },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false },
      required: true,
      defaultValue: "00",
      GridProps: { xs: 12, md: 3, sm: 3 },
      options: "getProductType",
      fullWidth: true,
      validate: "getValidateValue",
    },
    {
      render: { componentType: "select", group: 0 },
      name: "salutation",
      sequence: 3,
      label: "Salutation",
      placeholder: "Salutation",
      isReadOnly: false,
      required: true,
      defaultValue: "00",
      GridProps: { xs: 12, md: 3, sm: 3 },
      options: "getSalutation",
      validate: "getValidateValue",
      postValidationSetCrossFieldValues: "getGenderValue",
      fullWidth: true,
    },
    {
      render: { componentType: "textField", group: 0 },
      name: "firstName",
      sequence: 4,
      type: "text",
      label: "First Name[As Per PAN Card]",
      isReadOnly: false,
      required: true,
      placeholder: "First Name[As Per PAN Card]",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This Field is required."] }],
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      maxLength: 50,
    },
    {
      render: { componentType: "textField", group: 0 },
      name: "middleName",
      sequence: 5,
      type: "text",
      label: "Middle Name",
      isReadOnly: false,
      placeholder: "Middle Name",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      maxLength: 50,
    },
    {
      render: { componentType: "textField", group: 0 },
      name: "lastName",
      sequence: 6,
      type: "text",
      label: "Last Name",
      isReadOnly: false,
      required: true,
      placeholder: "Last Name",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This Field is required."] }],
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      maxLength: 50,
    },
    {
      render: { componentType: "select", group: 0 },
      name: "gender",
      sequence: 7,
      label: "Gender",
      placeholder: "Gender",
      required: true,
      defaultValue: "00",
      GridProps: { xs: 12, md: 3, sm: 3 },
      options: "getGenderList",
      validate: "getValidateValue",
      isReadOnly: false,
      fullWidth: true,
    },
    {
      render: { componentType: "dob", group: 0 },
      name: "dob",
      sequence: 8,
      label: "Date Of Birth",
      placeholder: "dd/mm/yyyy",
      isReadOnly: false,
      required: true,
      format: "dd/MM/yyyy",
      GridProps: { xs: 12, md: 3, sm: 3 },
      validationRun: "all",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This Field is required."] }],
      },
      fullWidth: true,
    },
    {
      render: { componentType: "currencyWithLeadingZeros", group: 0 },
      name: "loanAmount",
      sequence: 9,
      type: "text",
      label: "Your Desired Loan Amount",
      isReadOnly: false,
      required: true,
      placeholder: "Your Desired Loan Amount",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This Field is required."] }],
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
      validationRun: "onChange",
      validate: "validateLoanAmount",
      fullWidth: true,
    },
    {
      render: { componentType: "phoneNumber", group: 1 },
      name: "mobileNo",
      sequence: 10,
      type: "text",
      label: "Mobile No",
      isReadOnly: false,
      required: true,
      placeholder: "Mobile No",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This Field is required."] },
          { name: "min", params: [10, "Mobile No should be 10 digit."] },
          { name: "max", params: [10, "Mobile No should be 10 digit."] },
        ],
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
      StartAdornment: "+91",
      fullWidth: true,
    },
    {
      render: { componentType: "textField", group: 1 },
      name: "email",
      sequence: 11,
      type: "text",
      label: "Email",
      isReadOnly: false,
      required: true,
      placeholder: "Email",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This Field is required."] },
          { name: "email", params: ["Please enter valid Email ID."] },
        ],
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      maxLength: 100,
    },
    {
      render: { componentType: "select", group: 1 },
      name: "employementStatus",
      sequence: 12,
      label: "How Are You Currently Employed",
      placeholder: "How Are You Currently Employed",
      required: true,
      defaultValue: "00",
      GridProps: { xs: 12, md: 3, sm: 3 },
      options: "getRetailEmployee",
      validate: "getValidateValue",
      fullWidth: true,
      isReadOnly: false,
    },
    {
      render: { componentType: "textField", group: 1 },
      name: "landmark",
      sequence: 13,
      type: "text",
      label: "Landmark",
      isReadOnly: false,
      required: false,
      placeholder: "Landmark",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      maxLength: 100,
    },
    {
      render: { componentType: "numberFormat", group: 1 },
      name: "pincode",
      sequence: 14,
      label: "Residence Pincode",
      required: true,
      placeholder: "Residence Pincode",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This Field is required."] },
          { name: "min", params: [6, "Residence Pincode should be 6 digit."] },
          { name: "max", params: [6, "Residence Pincode should be 6 digit."] },
        ],
      },
      GridProps: { xs: 12, md: 3, sm: 3 },
      postValidationSetCrossFieldValues: "postValidationSetPincodeDtl",
      fullWidth: true,
      __VIEW__: { isReadOnly: false },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false },
      runPostValidationHookAlways: true,
    },
    {
      render: { componentType: "select", group: 1 },
      name: "location",
      sequence: 15,
      defaultValue: "00",
      label: "Location",
      isReadOnly: false,
      required: true,
      placeholder: "Location",
      postValidationSetCrossFieldValues: "postValidationSetLocationDtl",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      validate: "getValidateValue",
      dependentFields: ["pincode"],
      options: "getPincode",
      disableCaching: true,
    },
    {
      render: { componentType: "textField", group: 1 },
      name: "city",
      sequence: 16,
      label: "City",
      required: true,
      __VIEW__: { isReadOnly: false },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false },
      placeholder: "City",
      validate: "getValidateValue",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      maxLength: 100,
    },
    {
      render: { componentType: "textField", group: 1 },
      name: "district",
      sequence: 17,
      label: "District",
      isReadOnly: true,
      placeholder: "District",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
    },
    {
      render: { componentType: "textField", group: 1 },
      name: "state",
      sequence: 18,
      label: "State",
      isReadOnly: true,
      placeholder: "State",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
    },
    {
      render: { componentType: "textField", group: 1 },
      name: "country",
      sequence: 19,
      label: "Country",
      isReadOnly: true,
      placeholder: "Country",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
    },
    {
      render: { componentType: "textField", group: 1 },
      name: "address",
      sequence: 12.2,
      type: "text",
      label: "Address",
      required: false,
      placeholder: "Address",
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      maxLength: 200,
    },
  ],
};
