import { components, filters } from "components/report";

export const columns = [
  {
    columnName: "#",
    id: "particulars",
    Header: components.HeaderColumnCell,
    columns: [
      {
        columnName: "Particulars",
        accessor: "particulars",
        id: "particulars",
        Filter: filters.SelectColumnFilter,
        filter: "includes",
        Footer: "Total",
        width: 200,
      },
      {
        columnName: "Bucket",
        accessor: "bucket",
        id: "bucket",
        Filter: filters.SelectColumnFilter,
        filter: "includes",
        Footer: "",
        Aggregated: components.DefaultCellWithDefaultValue("Total"),
        width: 100,
      },
    ],
  },
  {
    columnName: "Total",
    id: "cfsmeTotal",
    Header: components.HeaderColumnCell,
    columns: [
      {
        columnName: "Count",
        accessor: "TotalCount",
        id: "TotalCount",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
      {
        columnName: "Value",
        accessor: "TotalValue",
        id: "TotalValue",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
      {
        columnName: "Fees",
        accessor: "TotalFees",
        id: "TotalFees",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
    ],
  },
  {
    columnName: "CF",
    id: "cf",
    Header: components.HeaderColumnCell,
    columns: [
      {
        columnName: "Count",
        accessor: "CFCount",
        id: "CFCount",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
      {
        columnName: "Value",
        accessor: "CFValue",
        id: "CFValue",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
      {
        columnName: "Fees",
        accessor: "CFFees",
        id: "CFFees",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
    ],
  },
  {
    columnName: "SME",
    id: "sme",
    Header: components.HeaderColumnCell,
    columns: [
      {
        columnName: "Count",
        accessor: "SMECount",
        id: "SMECount",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
      {
        columnName: "Value",
        accessor: "SMEValue",
        id: "SMEValue",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
      {
        columnName: "Fees",
        accessor: "SMEFees",
        id: "SMEFees",
        Filter: filters.SliderColumnFilter,
        filter: "filterGreaterThan",
        aggregate: "sum",
        alignment: "right",
        width: 120,
      },
    ],
  },
];
