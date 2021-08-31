import Typography from "@material-ui/core/Typography";

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
