import { useState, FC, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import metaData from "./metadata";
import Grid from "components/dataTableStatic";
import { SelectFileControl } from "./selectFileControl";
import { transformFileObject } from "components/fileUpload/utils";
import { onFileUpload } from "../api";

const customFileObjTransformer = transformFileObject({ remarks: "" });

export const UploadCSV: FC<any> = ({ onClose, isDataChangeRef }) => {
  const { state: rows }: any = useLocation();
  const refID = rows?.[0]?.id;
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(Infinity);
  const [error, setError] = useState("");
  const gridRef = useRef<any>(null);

  const setFilesTransformer = async (data) => {
    let result = data.map((one) => customFileObjTransformer(one));
    let final = await Promise.all(result);
    setFiles(final);
  };

  const onUpload = useCallback(
    async (onFileUpload) => {
      setLoading(true);
      setError("");
      onFileUpload(
        files,
        refID,
        (progressValue) => {
          setUploadProgress(progressValue);
        },
        ({ status, data }) => {
          if (status === "success") {
            isDataChangeRef.current = true;
            onClose();
          } else {
            setError(data?.error_msg ?? "unknown error occured");
          }
          setLoading(false);
        }
      );
    },
    [files]
  );

  return (
    <Dialog open={true} maxWidth="md">
      {loading ? (
        <LinearProgress
          variant={
            uploadProgress === Infinity ? "indeterminate" : "determinate"
          }
          value={uploadProgress}
        />
      ) : null}
      <Card>
        <CardHeader
          title="File Upload"
          action={
            <CardActions>
              <div style={{ flexGrow: 2 }} />
              {typeof onUpload === "function" ? (
                <Button
                  disabled={loading || files.length <= 0}
                  size="small"
                  color="primary"
                  onClick={() => onUpload(onFileUpload)}
                >
                  Upload
                </Button>
              ) : null}
              {typeof onClose === "function" ? (
                <Button
                  disabled={loading}
                  onClick={() => onClose()}
                  size="small"
                  color="primary"
                >
                  Close
                </Button>
              ) : null}
            </CardActions>
          }
        />
        {Boolean(error) ? <Alert severity="error">{error}</Alert> : null}
        <CardContent>
          <SelectFileControl setFiles={setFilesTransformer} />
          <Collapse in={files.length > 0}>
            <Grid
              finalMetaData={metaData}
              data={files}
              setData={() => {}}
              loading={loading}
              ref={gridRef}
            />
          </Collapse>
        </CardContent>
      </Card>
    </Dialog>
  );
};
