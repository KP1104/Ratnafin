import { FC, useMemo } from "react";
import cloneDeep from "lodash-es/cloneDeep";
import { HeaderColumnCell } from "./components/headerCell";
import { DefaultCell } from "./components/defaultCell";
import { FooterCell } from "./components/footerCell";
import { DefaultColumnFilter } from "./filter/defaultColumnFilter";
import { defaultColumnAggregation } from "./aggregation/defaultColumnAggregation";
import { GridTable } from "./gridTable";

export const GridParent: FC<any> = ({
  columns,
  label,
  maxHeight,
  disableFilters = false,
  data = [],
  initialState,
}) => {
  const transformedMetaData = useMemo(() => {
    let newMetaData = cloneDeep(columns);
    return newMetaData;
  }, []);

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

  return (
    <GridTable
      columns={transformedMetaData}
      defaultColumn={defaultColumn}
      label={label}
      data={data}
      maxHeight={maxHeight}
      disableFilters={disableFilters}
      initialState={initialState}
    />
  );
};
