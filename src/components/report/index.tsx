import { GridParent } from "./gridParent";
import { HeaderColumnCell } from "./components/headerCell";
import { NumberRangeColumnFilter } from "./filter/numberRangeColumnFilter";
import { SelectColumnFilter } from "./filter/selectColumnFilter";
import { SliderColumnFilter } from "./filter/sliderColumnFilter";
import { filterGreaterThan, fuzzyTextFilterFn } from "./filter/fns";
import makeData from "./generateData";
import { useState } from "react";

const columns = [
  {
    columnName: "Name",
    id: "name",
    Header: HeaderColumnCell,
    columns: [
      {
        columnName: "First Name",
        accessor: "firstName",
        id: "firstName",
        filter: fuzzyTextFilterFn,
        aggregate: "count",
      },
      {
        columnName: "Last Name",
        accessor: "lastName",
        id: "lastName",
        aggregate: "count",
      },
    ],
  },
  {
    columnName: "Info",
    id: "info",
    Header: HeaderColumnCell,
    columns: [
      {
        columnName: "Age",
        accessor: "age",
        id: "age",
        Filter: NumberRangeColumnFilter,
        aggregate: "sum",
      },
      {
        columnName: "Visits",
        accessor: "visits",
        id: "visits",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        aggregate: "sum",
      },
      {
        columnName: "Status",
        accessor: "status",
        id: "status",
        Filter: SelectColumnFilter,
        filter: "includes",
        aggregate: "count",
      },
      {
        columnName: "Profile Progress",
        accessor: "progress",
        id: "progress",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        aggregate: "sum",
      },
    ],
  },
];

const App = () => {
  const [data] = useState(() => makeData(10));
  return (
    <GridParent
      columns={columns}
      label="Demo"
      disableFilters
      maxHeight="340px"
      data={data}
    />
  );
};

export default App;
