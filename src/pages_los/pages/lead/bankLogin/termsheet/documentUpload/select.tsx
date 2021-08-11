import { useRef, useState, useContext, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useStyles } from "components/fileUpload/style";
import { useSnackbar } from "notistack";
import { FileUpload } from "./upload";
import { DOCContext } from "./context";
import { validateFilesAndAddToList } from "./utils";

export const SelectFile = ({
  isDataChangedRef,
  tranCD,
  closeUpdate,
  update,
  branchID,
}) => {
  const allowedExtensions = ["pdf"];
  const maxAllowedSize = 1024 * 1024 * 3;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const fileUploadControl = useRef<any | null>(null);
  const [file, setFile] = useState<any>("");
  const [fileTypeError, setFileTypeError] = useState<any>("");
  const { uploadDocuments } = useContext(DOCContext);

  const validateFilesAndAddToListCB = useCallback(
    async (files) => {
      let error = await validateFilesAndAddToList(
        maxAllowedSize,
        allowedExtensions
      )(files);
      setFileTypeError(error);
    },
    [maxAllowedSize, allowedExtensions]
  );

  const handleFileSelect = (e) => {
    const files = e.target.files;
    validateFilesAndAddToListCB(files[0] as File[]);
    if (fileTypeError !== null) {
      setFile(files);
    }
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
      {file.length > 0 && !Boolean(fileTypeError) ? (
        <FileUpload
          fileDetails={file}
          onUpload={uploadDocuments.fn({
            ...uploadDocuments.args,
            tranCD: tranCD,
          })}
          isDataChangedRef={isDataChangedRef}
          tranCD={tranCD}
          branchID={branchID}
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
          <FormHelperText style={{ color: "red" }}>
            {fileTypeError}
          </FormHelperText>
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
