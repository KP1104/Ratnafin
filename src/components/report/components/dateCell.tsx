import Typography from "@material-ui/core/Typography";
import { format as formatter } from "date-fns";

export const DateCell = (props) => {
  const {
    value,
    row: { isGrouped, isExpanded },
    column: { format = "dd/MM/yyyy" },
  } = props;

  let style: any = { whiteSpace: "nowrap" };

  if (isGrouped && isExpanded) {
    style = { ...style, fontWeight: 800 };
  }
  let result = "-";
  let date = new Date(value);
  //@ts-ignore
  if (!isNaN(date)) {
    result = formatter(new Date(value), format);
  }

  return (
    <Typography component="span" variant="subtitle2" style={style}>
      {result}
    </Typography>
  );
};
