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
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { GroupByCell } from "./components/groupByCell";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { createNewWorkbook } from "./export";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Typography } from "@material-ui/core";
import { FixedSizeList } from "react-window";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSequenceColumn } from "./components/useSequence";

interface GridTableType {
  columns: any;
  defaultColumn: any;
  data: any;
  maxHeight: number;
  initialState?: any;
  filterTypes?: any;
  title?: any;
  options?: any;
  loading: boolean;
  hideFooter?: boolean;
}

const defaultMaxHeight = 300;

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
  title,
  options,
  loading = false,
  hideFooter = false,
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
      ...options,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    useResizeColumns,
    useBlockLayout,
    useSequenceColumn
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    toggleAllRowsExpanded,
    isAllRowsExpanded,
    setAllFilters,
    state: { filters },
  } = tableProps;

  const RenderRows = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);

      if (row?.isGrouped && row?.isExpanded) {
        style = {
          ...style,
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        };
      }

      return (
        <TableRow {...row.getRowProps({ style })} component="div">
          {row.cells.map((cell, index) => {
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
                  <GroupByCell cell={cell} row={row} key={index} />
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
    },
    [prepareRow, rows]
  );

  return (
    <Fragment>
      <Paper
        style={{
          width: "100%",
          overflow: "hidden",
          marginBottom: "8px",
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h5">{title}</Typography>
          <div style={{ flexGrow: 1 }} />
          {showFilters && filters.length > 0 && (
            <Button
              onClick={() => setAllFilters([])}
              style={{ marginRight: "8px" }}
            >
              Clear Filter
            </Button>
          )}

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
          <IconButton
            onClick={() => createNewWorkbook({ data: data, title: title })}
            size="small"
          >
            <GetAppIcon />
          </IconButton>
        </Toolbar>
      </Paper>
      {loading && <LinearProgress />}
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
                          {
                            style: {
                              display: "flex",
                            },
                          },
                        ])}
                        component="div"
                        align={column.alignment}
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
              <FixedSizeList
                height={maxHeight}
                itemCount={rows.length}
                itemSize={35}
                width={totalColumnsWidth + 10}
                overscanCount={10}
              >
                {RenderRows}
              </FixedSizeList>
            </TableBody>
            {hideFooter ? null : (
              <TableHead
                component="div"
                style={{
                  boxShadow:
                    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                }}
              >
                <RenderFooter footerGroup={footerGroups[0]} />
              </TableHead>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};
