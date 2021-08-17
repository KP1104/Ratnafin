import { FC, useMemo, useState, Fragment, useCallback, useRef } from "react";
import { HeaderColumnCell } from "./components/headerCell";
import { DefaultCell } from "./components/defaultCell";
import { FooterCell } from "./components/footerCell";
import { DefaultColumnFilter } from "./filter/defaultColumnFilter";
import { defaultColumnAggregation } from "./aggregation/defaultColumnAggregation";
import { GridTable } from "./gridTable";
import { fuzzyTextFilterFn, customText, filterGreaterThan } from "./filters";

export const ReportGrid: FC<any> = ({
  columns,
  maxHeight,
  disableFilters = false,
  data = [],
  initialState,
}) => {
  const memoizedColumns = useMemo(() => columns, []);

  const defaultColumn = useMemo(
    () => ({
      Header: HeaderColumnCell,
      Cell: DefaultCell,
      Footer: FooterCell,
      Filter: DefaultColumnFilter,
      Aggregated: defaultColumnAggregation,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      customText: customText,
      filterGreaterThan: filterGreaterThan,
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
      />
    </Fragment>
  );
};
