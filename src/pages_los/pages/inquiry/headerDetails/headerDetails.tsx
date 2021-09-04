import { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { format } from "date-fns";
import { InquiryReject } from "../inquiryReject";

export const HeaderDetails: FC<any> = ({
  productData,
  handleDialogClose,
  isDataChangedRef,
  rejectInquiry = false,
}) => {
  const [showDialog, setShowDialog] = useState(Boolean);
  const classes = useStyles();
  let dateValue;
  try {
    dateValue = format(new Date(productData?.tran_dt), "dd/MM/yyyy");
  } catch (e) {
    dateValue = "Invalid Date";
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Inquiry No</div>
          <div className={classes.valueText}>{productData?.inquiry_no}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Branch</div>
          <div className={classes.valueText}>{productData?.branch_name}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Product</div>
          <div className={classes.valueText}>{productData?.product_cd}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Current Status</div>
          <div className={classes.valueText}>{productData?.status}</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        {Boolean(rejectInquiry) ? (
          <Button onClick={() => setShowDialog(true)} style={{ color: "red" }}>
            Reject Inquiry
          </Button>
        ) : null}
        <Button onClick={handleDialogClose}>Close</Button>
      </div>
      <InquiryReject
        open={showDialog}
        setShowDialog={setShowDialog}
        closeDialog={handleDialogClose}
        inquiryNo={productData?.tran_cd}
        isDataChangedRef={isDataChangedRef}
      />
    </div>
  );
};
