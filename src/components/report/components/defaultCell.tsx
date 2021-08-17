import Typography from "@material-ui/core/Typography";

export const DefaultCell = (props) => {
  const { value } = props;

  return (
    <Typography
      component="span"
      variant="subtitle2"
      style={{ whiteSpace: "nowrap" }}
    >
      {value}
    </Typography>
  );
};
