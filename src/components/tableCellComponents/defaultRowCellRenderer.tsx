import Tooltip from "@material-ui/core/Tooltip";

export const DefaultRowCellRenderer = (props) => {
  const {
    value,
    column: { showTooltip = false, color = "initial" },
  } = props;
  let result = (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: typeof color === "function" ? color(value) : color,
      }}
    >
      {value}
    </span>
  );
  return showTooltip ? <Tooltip title={value}>{result}</Tooltip> : result;
};
