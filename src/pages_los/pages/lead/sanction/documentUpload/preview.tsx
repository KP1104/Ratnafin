import { useState, useContext, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import loaderGif from "assets/images/loader.gif";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "components/fileUpload/style";
import Close from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { DOCContext } from "./context";
import { SelectFile } from "./select";

export const ToPreviewDocument = ({
  tranCD,
  branchID,
  fileName,
  isDataChangedRef,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const closeUpdate = () => {
    setUpdate(false);
  };

  return (
    <>
      {Boolean(open) || Boolean(update) ? (
        <>
          <PreviewDocument
            tranCD={tranCD}
            branchID={branchID}
            open={open}
            setOpen={setOpen}
            fileName={fileName}
            closeUpdate={closeUpdate}
            isDataChangedRef={isDataChangedRef}
            update={update}
          />
        </>
      ) : (
        <>
          <div
            className={classes.uploadWrapper}
            style={{ alignSelf: "center", height: "200px" }}
          >
            <Button color="primary" onClick={() => setOpen(true)}>
              Preview
            </Button>
            <Typography>Termsheet</Typography>

            <input type="file" style={{ display: "none" }} />
          </div>
          <div>
            <Button
              color="primary"
              onClick={() => setUpdate(true)}
              style={{ display: "contents", marginTop: "10px" }}
            >
              Update
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export const PreviewDocument = ({
  tranCD,
  branchID,
  open,
  setOpen,
  fileName,
  update,
  isDataChangedRef,
  closeUpdate,
}) => {
  return (
    <>
      {Boolean(open) ? (
        <FileViewer
          tranCD={tranCD}
          open={open}
          setOpen={setOpen}
          fileName={fileName}
        />
      ) : Boolean(update) ? (
        <SelectFile
          isDataChangedRef={isDataChangedRef}
          tranCD={tranCD}
          branchID={branchID}
          closeUpdate={closeUpdate}
          update={update}
        />
      ) : null}
    </>
  );
};

export const FileViewer = ({ tranCD, open, setOpen, fileName }) => {
  const { loading, blob, error, success } = useBlobLoader({
    tranCD,
  });
  const urlObj = useRef<any>("");
  if (success) {
    urlObj.current = URL.createObjectURL(blob);
  }
  useEffect(() => {
    let toRemoveURL = urlObj.current ?? "";
    return () => {
      URL.revokeObjectURL(toRemoveURL);
    };
  }, []);
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileName}</Typography>
        <div style={{ flexGrow: 1 }}></div>

        <IconButton color="primary" onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </DialogActions>
      <DialogContent>
        {loading ? (
          <img src={loaderGif} width="50px" height="50px" alt="loader" />
        ) : Boolean(error) ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <iframe
            src={`${urlObj.current}`}
            title="Document View"
            style={{ height: "600px", width: "100%" }}
            aria-label="File Preview"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const useBlobLoader = ({ tranCD }) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { previewDocument } = useContext(DOCContext);
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    previewDocument
      .fn(previewDocument.args)(tranCD)
      .then((blob) => {
        if (blob instanceof Error) {
          setError(blob.message);
          setLoading(false);
          setSuccess(false);
        } else {
          if (blob.type === "application/json") {
            blob.text((data) => {
              setError(data);
              setLoading(false);
              setSuccess(false);
            });
          } else {
            const fileTypeBlob = new Blob([blob], {
              type: "application/pdf",
            });
            setBlob(fileTypeBlob);
            setSuccess(true);
            setError("");
            setLoading(false);
          }
        }
      })
      .catch((e) => {
        setError(e.message);
        setLoading(true);
        setSuccess(false);
      });
  }, [setError, setLoading, setSuccess, setBlob, tranCD, previewDocument]);
  return {
    success,
    loading,
    error,
    blob,
  };
};
