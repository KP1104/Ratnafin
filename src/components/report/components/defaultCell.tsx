import Typography from "@material-ui/core/Typography";

export const DefaultCell = (props) => {
  const {
    value,
    row: { isGrouped, isExpanded },
  } = props;

  let style: any = { whiteSpace: "nowrap" };

  if (isGrouped && isExpanded) {
    style = { ...style, fontWeight: 800 };
  }

  return (
    <Typography component="span" variant="subtitle2" style={style}>
      {value}
    </Typography>
  );
};

export const DefaultCellWithDefaultValue = (value: string) => (props) => {
  const {
    row: { isGrouped, isExpanded },
  } = props;
  let style: any = { whiteSpace: "nowrap" };

  if (isGrouped && isExpanded) {
    style = { ...style, fontWeight: 800 };
  }

  return (
    <Typography component="span" variant="subtitle2" style={style}>
      {value}
    </Typography>
  );
};
