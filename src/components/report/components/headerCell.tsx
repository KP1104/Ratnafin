import TableSortLabel from "@material-ui/core/TableSortLabel";

export const HeaderColumnCell = (props) => {
  //Column change order using drag and drop
  const { column } = props;

  return (
    <>
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? "desc" : "asc"}
        hideSortIcon={true}
        {...column.getSortByToggleProps([
          {
            style: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              color: "#0063a3",
              fontSize: "1 rem",
              fontWeight: "600",
              paddingRight:
                //@ts-ignore
                (column?.TableCellProps?.align ?? "left") === "right" &&
                column.canFilter
                  ? "15px"
                  : "10px",
            },
          },
        ])}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            paddingRight: "10px",
          }}
        >
          {column.columnName}
        </span>
      </TableSortLabel>
      {column.canGroupBy ? (
        <span {...column.getGroupByToggleProps()}>
          {column.isGrouped ? "🔴" : "➕"}
        </span>
      ) : null}
      <div
        {...column.getResizerProps([
          {
            style: {
              display: "inline-block",
              position: "absolute",
              right: "-5px",
              top: "0",
              padding: "0 5px",
              zIndex: 1,
            },
          },
        ])}
      >
        <div
          style={{
            height: "35px",
            width: "6px",
            backgroundColor: "#888",
          }}
        ></div>
      </div>
    </>
  );
};
