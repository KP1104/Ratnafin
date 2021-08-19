import { FC, useMemo, Fragment } from "react";
import { HeaderColumnCell } from "./components/headerCell";
import { DefaultCell } from "./components/defaultCell";
import { FooterCell } from "./components/footerCell";
import { DefaultColumnFilter } from "./filter/defaultColumnFilter";
import { GridTable } from "./gridTable";
import {
  fuzzyTextFilterFn,
  customText,
  filterGreaterThan,
  customInclude,
} from "./filters";

export const ReportGrid: FC<any> = ({
  columns,
  maxHeight,
  data = [],
  initialState,
  title,
  options,
}) => {
  const memoizedColumns = useMemo(() => columns, []);

  const defaultColumn = useMemo(
    () => ({
      Header: HeaderColumnCell,
      Cell: DefaultCell,
      Footer: FooterCell,
      Filter: DefaultColumnFilter,
      Aggregated: DefaultCell,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      customText: customText,
      filterGreaterThan: filterGreaterThan,
      customInclude: customInclude,
    }),
    []
  );

  return (
    <Fragment>
      <GridTable
        columns={memoizedColumns}
        defaultColumn={defaultColumn}
        data={data}
        maxHeight={maxHeight}
        initialState={initialState}
        filterTypes={filterTypes}
        title={title}
        options={options}
      />
    </Fragment>
  );
};
