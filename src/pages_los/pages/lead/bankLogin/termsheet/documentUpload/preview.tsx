import { Fragment, useState, useContext, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import loaderGif from "assets/images/loader.gif";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { DOCContext } from "./context";

export const ToPreviewDocument = ({ tranCD }) => {
  const [open, setOpen] = useState(Boolean);

  return (
    <>
      {Boolean(open) ? (
        <PreviewDocument tranCD={tranCD} open={open} setOpen={setOpen} />
      ) : (
        <Button onClick={() => setOpen(true)}>Preview Document</Button>
      )}
    </>
  );
};

export const PreviewDocument = ({ tranCD, open, setOpen }) => {
  return <FileViewer tranCD={tranCD} open={open} setOpen={setOpen} />;
};

export const FileViewer = ({ tranCD, open, setOpen }) => {
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
        <Typography variant="h6">ABC</Typography>
        <div style={{ flexGrow: 1 }}></div>

        <IconButton color="primary" onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </DialogActions>
      <DialogContent>
        {loading ? (
          <img src={loaderGif} width="50px" height="50px" alt="loader" />
        ) : Boolean(error) ? (
          <span>{error}</span>
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
      .fn(previewDocument.args)
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
