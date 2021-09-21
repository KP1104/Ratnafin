export const unmappedHOMetaData = {
  gridConfig: {
    dense: false,
    pageSize: [20, 30, 50],
    defaultPageSize: "20",
    gridLabel: "Unmapped Inquiries HO",
    rowIdColumn: "tran_cd",
    allowColumnReordering: true,
    allowColumnHiding: true,
    allowKeyboardNavigation: true,
    allowGlobalFilter: true,
  },
  columns: [
    {
      accessor: "inquiry_no",
      columnName: "Inquiry CD",
      sequence: 1,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: false,
      disableFilters: false,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "tran_cd",
      columnName: "Inquiry CD",
      sequence: 1,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: false,
      disableFilters: false,
      isVisible: false,
    },
    {
      accessor: "tran_dt",
      columnName: "Inquiry Date",
      sequence: 2,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "date",
      disableSortBy: false,
      disableFilters: false,
      filterComponentType: "rangeFilter",
      filterProps: {
        type: "date",
      },
      isVisible: true,
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "branch_name",
      columnName: "Branch",
      sequence: 3,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "optionsFilter",
      filterProps: {
        selectType: "multiple",
      },
      isVisible: true,
    },
    {
      accessor: "category_id",
      columnName: "Category",
      sequence: 4,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "optionsFilter",
      filterProps: {
        selectType: "multiple",
      },
      isVisible: true,
    },
    {
      accessor: "product_cd",
      columnName: "Product",
      sequence: 5,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "optionsFilter",
      filterProps: {
        selectType: "multiple",
      },
      isVisible: true,
    },
    {
      accessor: "priority",
      columnName: "Priority",
      sequence: 6,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "optionsFilter",
      filterProps: {
        selectType: "multiple",
      },
      isVisible: true,
    },
    {
      accessor: "first_name",
      columnName: "Customer Name",
      sequence: 7,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: false,
      disableFilters: false,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "gender",
      columnName: "Gender",
      sequence: 8,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: true,
      filterComponentType: "optionsFilter",
      filterProps: {
        selectType: "multiple",
      },
      isVisible: true,
    },
    {
      accessor: "birth_dt",
      columnName: "Birth Date",
      sequence: 9,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "date",
      disableSortBy: true,
      disableFilters: true,
      filterComponentType: "rangeFilter",
      filterProps: {
        type: "date",
      },
      isVisible: true,
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "mobile",
      columnName: "Mobile",
      sequence: 10,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "e_mail_id",
      columnName: "Email",
      sequence: 11,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: true,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "desire_loan_amt",
      columnName: "Loan Amount",
      sequence: 12,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "right",
      componentType: "currency",
      disableSortBy: true,
      disableFilters: true,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "postal_cd",
      columnName: "Postal Code",
      sequence: 13,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "district",
      columnName: "District",
      sequence: 14,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "lead_generate",
      columnName: "Lead Generated",
      sequence: 15,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: false,
      filterComponentType: "optionsFilter",
      filterProps: {
        selectType: "multiple",
      },
      isVisible: true,
    },
    {
      accessor: "sub_product1",
      columnName: "Sub Product-1",
      sequence: 16,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: true,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "sub_product2",
      columnName: "Sub Product-2",
      sequence: 17,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: true,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
    {
      accessor: "entered_by",
      columnName: "Entered By",
      sequence: 18,
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      alignment: "left",
      componentType: "default",
      disableSortBy: true,
      disableFilters: true,
      filterComponentType: "valueFilter",
      isVisible: true,
    },
  ],
};
