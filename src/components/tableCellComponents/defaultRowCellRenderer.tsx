import Tooltip from "@material-ui/core/Tooltip";

export const DefaultRowCellRenderer = (props) => {
  const {
    value,
    column: {
      showTooltip = false,
      color = "initial",
      transform = (value) => value,
    },
  } = props;

  let newValue = transform(value);
  let result = (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: typeof color === "function" ? color(value) : color,
      }}
    >
      {newValue}
    </span>
  );
  return showTooltip ? <Tooltip title={value}>{result}</Tooltip> : result;
};
