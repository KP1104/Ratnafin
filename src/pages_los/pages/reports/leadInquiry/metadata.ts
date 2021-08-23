import { components, filters } from "components/report";

export const columns = [
  {
    columnName: "Inquiry No",
    accessor: "inquiryNo",
    Filter: filters.DefaultColumnFilter,
    filter: "customText",
    width: 120,
  },
  {
    columnName: "Cold Calling ID",
    accessor: "coldCallingID",
    width: 120,
  },
  {
    columnName: "Lead No",
    accessor: "leadNo",
    width: 120,
  },
  {
    columnName: "Entry Date",
    accessor: "entryDate",
    Cell: components.DateCell,
    width: 120,
  },
  {
    columnName: "category",
    accessor: "categoryID",
    width: 120,
  },
  {
    columnName: "product",
    accessor: "productID",
    width: 120,
  },
  {
    columnName: "sub Product 1",
    accessor: "subProduct1ID",
    width: 120,
  },
  {
    columnName: "sub Product 2",
    accessor: "subProduct2ID",
    width: 120,
  },
  {
    columnName: "First Name",
    accessor: "firstName",
    width: 120,
  },
  {
    columnName: "Middle Name",
    accessor: "middleName",
    width: 120,
  },
  {
    columnName: "Last Name",
    accessor: "lastName",
    width: 120,
  },
  {
    columnName: "Mobile",
    accessor: "mobile",
    width: 120,
  },
  {
    columnName: "Postal Code",
    accessor: "postalCode",
    width: 120,
  },
  {
    columnName: "Location",
    accessor: "location",
    width: 120,
  },
  {
    columnName: "City",
    accessor: "city",
    width: 120,
  },
  {
    columnName: "District",
    accessor: "district",
    width: 120,
  },
  {
    columnName: "State",
    accessor: "state",
    width: 120,
  },
  {
    columnName: "Country",
    accessor: "country",
    width: 120,
  },
  {
    columnName: "Desire Loan Amount",
    accessor: "desireLoanAmt",
    width: 120,
    alignment: "right",
  },
  {
    columnName: "lead Generated",
    accessor: "leadGenerate",
    width: 120,
  },
  {
    columnName: "lead Generated Date",
    accessor: "leadGenerateDate",
    Cell: components.DateCell,
    width: 120,
  },
  {
    columnName: "Priority",
    accessor: "priority",
    width: 120,
  },
  {
    columnName: "Entered By",
    accessor: "enteredBy",
    width: 120,
  },
];
