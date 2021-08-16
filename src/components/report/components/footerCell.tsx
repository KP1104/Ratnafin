import { useMemo } from "react";

export const FooterCell = ({ rows, column: { id: columnName } }) => {
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
      {`${isNaN(total) ? "" : total}`}
    </span>
  );
};
