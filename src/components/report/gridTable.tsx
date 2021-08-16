import { FC, Fragment } from "react";
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
import Typography from "@material-ui/core/Typography";
import { GroupByCell } from "./components/groupByCell";

interface GridTableType {
  columns: any;
  defaultColumn: any;
  data: any;
  label: any;
  maxHeight: any;
  disableFilters?: boolean;
  initialState?: any;
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
  label,
  maxHeight = defaultMaxHeight,
  disableFilters,
  initialState = {},
}) => {
  const tableProps = useTable(
    {
      columns,
      data,
      defaultColumn,
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
  } = tableProps;

  return (
    <Fragment>
      <Typography variant="h4">{label}</Typography>
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
            {disableFilters ? null : (
              <RenderFilters
                headerGroup={headerGroups[headerGroups.length - 1]}
              />
            )}
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
