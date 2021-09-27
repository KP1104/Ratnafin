import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export const MultipleValuesCellRenderer = (props) => {
  const {
    value,
    column: { color = "initial", seperator = "," },
  } = props;

  let newValue = value.split(seperator);
  let newColor = typeof color === "function" ? color(value) : color;
  return (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: newColor,
      }}
    >
      {newValue[0]}
      {newValue.length > 1 ? <MoreHorizIcon /> : null}
    </span>
  );
};
