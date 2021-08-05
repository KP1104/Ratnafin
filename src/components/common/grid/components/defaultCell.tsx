import Typography from "@material-ui/core/Typography";

export const DefaultCellRender = ({ value }) => {
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
