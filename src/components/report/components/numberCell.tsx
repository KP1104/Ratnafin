import Typography from "@material-ui/core/Typography";
import { useMemo } from "react";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  style: "currency",
  currency: "INR",
});

export const NumberCell = ({ value }) => {
  let result = "-";
  if (value !== null && value !== "" && !isNaN(Number(value))) {
    result = `${currencyFormatter.format(value)}`;
  }
  return (
    <Typography component="span" variant="subtitle2">
      {result}
    </Typography>
  );
};

export const FooterCellWithNumber = ({ rows, column: { id: columnName } }) => {
  const total = useMemo(
    () =>
      rows.reduce((sum, row) => Number(row.values?.[columnName] ?? 0) + sum, 0),
    [rows]
  );

  return (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {`${isNaN(total) ? "" : currencyFormatter.format(total)}`}
    </span>
  );
};
