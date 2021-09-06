export const partnerUpload = [
  {
    columnName: "Document Type",
    componentType: "editableSelect",
    accessor: "docTypeID",
    sequence: 5,
    alignment: "left",
    options: "getPartnerDocType",
    schemaValidation: {
      type: "string",
      rules: [{ name: "required", params: ["required"] }],
    },
  },
  {
    columnName: "Password",
    componentType: "editableTextField",
    accessor: "password",
    sequence: 6,
    alignment: "left",
    isPassword: true,
  },
  {
    columnName: "Remarks",
    componentType: "editableTextField",
    accessor: "remarks",
    sequence: 7,
    alignment: "left",
  },
];
