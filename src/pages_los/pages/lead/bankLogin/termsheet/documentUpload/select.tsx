import { useRef, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "components/fileUpload/style";
import { useSnackbar } from "notistack";
import { FileUpload } from "./upload";
import { DOCContext } from "./context";

export const SelectFile = ({
  isDataChangedRef,
  tranCD,
  closeUpdate,
  update,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const fileUploadControl = useRef<any | null>(null);
  const [file, setFile] = useState<any>("");
  const { uploadDocuments } = useContext(DOCContext);

  const handleFileSelect = (e) => {
    setFile(e.target.files);
  };

  const closeWrapper = () => {
    if (isDataChangedRef.current === true) {
      enqueueSnackbar("Documents Successfully uploaded", {
        variant: "success",
      });
    }
  };

  return (
    <>
      {file.length > 0 ? (
        <FileUpload
          fileDetails={file}
          onUpload={uploadDocuments.fn({
            ...uploadDocuments.args,
            tranCD: tranCD,
          })}
          isDataChangedRef={isDataChangedRef}
          tranCD={tranCD}
          closeUpdate={closeUpdate}
          closeDialog={closeWrapper}
        />
      ) : (
        <>
          <div
            className={classes.uploadWrapper}
            style={{ alignSelf: "center", height: "200px" }}
          >
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
          {Boolean(update) ? (
            <div>
              <Button
                onClick={closeUpdate}
                style={{ display: "contents", marginTop: "10px" }}
              >
                Cancel
              </Button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};
