import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { format } from "date-fns";

export const Header = ({ details, closeDialog }) => {
  const classes = useStyles();
  let dateValue;
  try {
    dateValue = format(new Date(details?.enteredDate), "dd/MM/yyyy");
  } catch (e) {
    dateValue = "Invalid Date";
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Ref No</div>
          <div className={classes.valueText}>{details?.refID}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Campaign Name</div>
          <div className={classes.valueText}>{details?.campaignName}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </div>
    </div>
  );
};
