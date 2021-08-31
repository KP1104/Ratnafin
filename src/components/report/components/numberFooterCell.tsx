import { useMemo } from "react";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  style: "currency",
  currency: "INR",
});

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
