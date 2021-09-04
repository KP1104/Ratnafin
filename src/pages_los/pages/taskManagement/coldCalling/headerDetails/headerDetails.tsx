import { useState, FC } from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { format } from "date-fns";
import { ColdCallingReject } from "../coldCallingReject";

export const HeaderDetails: FC<any> = ({
  rowData,
  handleDialogClose,
  isDataChangedRef,
  rejectColdCalling = false,
}) => {
  const [showDialog, setShowDialog] = useState(Boolean);
  const classes = useStyles();
  let dateValue;
  try {
    dateValue = format(new Date(rowData?.tran_dt), "dd/MM/yyyy");
  } catch (e) {
    dateValue = "Invalid Date";
  }

  let currencyFormatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Cold Calling No.</div>
          <div className={classes.valueText}>{rowData?.tran_cd}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Product Category</div>
          <div className={classes.valueText}>{rowData?.category_id}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Loan Amount</div>
          <div className={classes.valueText}>
            {currencyFormatter.format(rowData?.loan_amt)}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Status</div>
          <div className={classes.valueText}>{rowData?.status}</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        {Boolean(rejectColdCalling) ? (
          <Button onClick={() => setShowDialog(true)} style={{ color: "red" }}>
            Reject Cold-Calling
          </Button>
        ) : null}

        <Button onClick={handleDialogClose}>Close</Button>
      </div>
      <ColdCallingReject
        open={showDialog}
        setShowDialog={setShowDialog}
        closeDialog={handleDialogClose}
        coldCallingNo={rowData?.tran_cd}
        isDataChangedRef={isDataChangedRef}
      />
    </div>
  );
};
