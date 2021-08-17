import { Fragment, useState, useCallback, FC } from "react";
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
} from "react-table";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { GroupByCell } from "./components/groupByCell";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface GridTableType {
  columns: any;
  defaultColumn: any;
  data: any;
  maxHeight: any;
  initialState?: any;
  filterTypes?: any;
}

const defaultMaxHeight = "200px";

const RenderFilters = ({ headerGroup }) => {
  return (
    <TableHead component="div">
      <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
        {headerGroup.headers.map((column) => {
          return (
            <TableCell {...column.getHeaderProps()} component="div">
              {column.canFilter ? column.render("Filter") : ""}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

const RenderFooter = ({ footerGroup }) => {
  return (
    <TableRow {...footerGroup.getFooterGroupProps()} component="div">
      {footerGroup.headers.map((column) => (
        <TableCell
          {...column.getFooterProps([
            {
              style: { textAlign: column?.alignment ?? "unset" },
            },
          ])}
          component="div"
        >
          {column.render("Footer")}
        </TableCell>
      ))}
    </TableRow>
  );
};

export const GridTable: FC<GridTableType> = ({
  columns,
  defaultColumn,
  data,
  maxHeight = defaultMaxHeight,
  initialState = {},
  filterTypes,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const handleFilterChange = useCallback(() => {
    setShowFilters((old) => !old);
  }, [setShowFilters]);
  const tableProps = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    useResizeColumns,
    useBlockLayout
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    toggleAllRowsExpanded,
    isAllRowsExpanded,
  } = tableProps;

  return (
    <Fragment>
      <Paper
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Toolbar variant="dense">
          <FormControlLabel
            control={
              <Switch
                checked={showFilters}
                onChange={handleFilterChange}
                name="filters"
                size="small"
              />
            }
            label="show Filters"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
                checked={isAllRowsExpanded}
                name="filters"
                size="small"
              />
            }
            label="Expand Rows"
          />
        </Toolbar>
      </Paper>
      <Paper
        style={{
          width: "100%",
          overflow: "hidden",
        }}
        tabIndex={0}
      >
        <TableContainer>
          <Table {...getTableProps()} size="small" component="div">
            <TableHead component="div">
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  component="div"
                >
                  {headerGroup.headers.map((column) => {
                    return (
                      <TableCell
                        {...column.getHeaderProps([
                          { style: { display: "flex" } },
                        ])}
                        component="div"
                      >
                        {column.render("Header")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            {showFilters ? (
              <RenderFilters
                headerGroup={headerGroups[headerGroups.length - 1]}
              />
            ) : null}
            <TableBody {...getTableBodyProps({})} component="div">
              <div
                style={{
                  overflowY: "scroll",
                  maxHeight: maxHeight,
                  overflowX: "hidden",
                }}
              >
                {rows.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  return (
                    <TableRow {...rowProps} component="div">
                      {row.cells.map((cell) => {
                        return (
                          <TableCell
                            {...cell.getCellProps([
                              {
                                style: {
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  textAlign: cell?.column?.alignment ?? "unset",
                                },
                              },
                            ])}
                            component="div"
                          >
                            {cell.isGrouped ? (
                              <GroupByCell cell={cell} row={row} key={i} />
                            ) : cell.isAggregated ? (
                              cell.render("Aggregated")
                            ) : cell.isPlaceholder ? null : (
                              cell.render("Cell")
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </div>
            </TableBody>
            <TableHead component="div">
              <RenderFooter footerGroup={footerGroups[0]} />
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};
