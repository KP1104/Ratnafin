import { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

export const FileUpload = ({
  fileDetails,
  onUpload,
  closeDialog,
  isDataChangedRef,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(Infinity);
  const [error, setError] = useState("");

  const uploadDocuments = useCallback(
    async (onUpload) => {
      setLoading(true);
      setError("");
      onUpload(
        fileDetails[0],
        (progressValue) => {
          setUploadProgress(progressValue);
        },
        ({ status, data }) => {
          if (status === "success") {
            isDataChangedRef.current = true;
          } else {
            setError(data?.error_msg ?? "unknown error occured");
          }
          setLoading(false);
        }
      );
    },
    [setLoading, setError]
  );
  return (
    <>
      {loading ? (
        <LinearProgress
          variant={
            uploadProgress === Infinity ? "indeterminate" : "determinate"
          }
          value={uploadProgress}
        />
      ) : Boolean(error) ? (
        <Alert severity="error">{error}</Alert>
      ) : fileDetails ? (
        <>
          <div>
            <p>Name: {fileDetails[0].name}</p>
          </div>
          <Button color="primary" onClick={() => uploadDocuments(onUpload)}>
            Upload
          </Button>
        </>
      ) : null}
    </>
  );
};
