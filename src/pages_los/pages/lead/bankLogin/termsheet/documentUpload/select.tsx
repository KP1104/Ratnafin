import { useRef, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "components/fileUpload/style";
import { FileUpload } from "./upload";
import { DOCContext } from "./context";

export const SelectFile = ({ closeDialog, isDataChangedRef }) => {
  const classes = useStyles();
  const fileUploadControl = useRef<any | null>(null);
  const [file, setFile] = useState<any>("");
  const { uploadDocuments } = useContext(DOCContext);

  const handleFileSelect = (e) => {
    setFile(e.target.files);
  };

  return (
    <>
      {file.length > 0 ? (
        <FileUpload
          fileDetails={file}
          onUpload={uploadDocuments.fn({
            ...uploadDocuments.args,
          })}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
        />
      ) : (
        <div className={classes.uploadWrapper} style={{ alignSelf: "center" }}>
          <Typography>Upload</Typography>
          <Button
            color="primary"
            onClick={() => fileUploadControl?.current?.click()}
          >
            Termsheet
          </Button>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileUploadControl}
            onChange={handleFileSelect}
          />
        </div>
      )}
    </>
  );
};
