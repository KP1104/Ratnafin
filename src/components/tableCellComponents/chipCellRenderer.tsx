import Chip from "@material-ui/core/Chip";

export const ChipCellRenderer = (props) => {
  const {
    value,
    column: { color = "initial", transform = (value) => value },
  } = props;
  let newValue = transform(value);
  let myColor = typeof color === "function" ? color(value) : color;
  return (
    <Chip
      label={newValue}
      variant="outlined"
      style={{ color: myColor, borderColor: myColor }}
    />
  );
};
