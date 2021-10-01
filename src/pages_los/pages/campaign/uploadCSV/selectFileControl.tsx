import { useRef } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "components/fileUpload/style";

export const SelectFileControl = ({ setFiles }) => {
  const classes = useStyles();
  const fileUploadControl = useRef<any | null>(null);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setFiles(filesArray);
  };

  return (
    <div
      className={classes.uploadWrapper}
      style={{ alignSelf: "center", height: "200px" }}
    >
      <Typography>Upload</Typography>
      <Button
        color="primary"
        onClick={() => fileUploadControl?.current?.click()}
      >
        Browse File
      </Button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileUploadControl}
        onChange={handleFileSelect}
      />
    </div>
  );
};
