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
  const [error, setError] = useState<any>("");
  const { uploadDocuments, context } = useContext(DOCContext);

  const validateFilesAndAddToListCB = useCallback(
    async (files) => {
      let error = await validateFilesAndAddToList(
        maxAllowedSize,
        allowedExtensions
      )(files);
      setError(error);
    },
    [maxAllowedSize, allowedExtensions]
  );

  const handleFileSelect = (e) => {
    const files = e.target.files;
    validateFilesAndAddToListCB(files[0] as File[]);
    if (error !== null) {
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
      {file.length > 0 && !Boolean(error) ? (
        <FileUpload
          fileDetails={file}
          onUpload={uploadDocuments.fn({
            ...uploadDocuments.args,
            tranCD: tranCD,
            moduleType: context.moduleType,
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
              {context.moduleType}
            </Button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileUploadControl}
              onChange={handleFileSelect}
              accept="application/pdf"
            />
          </div>
          <FormHelperText style={{ color: "red" }}>{error}</FormHelperText>
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
