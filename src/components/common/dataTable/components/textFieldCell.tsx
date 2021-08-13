import { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { RowContext } from "./rowContext";
import { DefaultCell } from "./defaultCell";

export const TextFieldCell = (props) => {
  const {
    column: { id: columnName, type },
    row: { id },
    currentEditRow,
  } = props;
  if (currentEditRow === id) {
    return (
      <MyTextField
        key={columnName}
        columnName={columnName}
        type={type ?? "text"}
      />
    );
  } else {
    return <DefaultCell {...props} />;
  }
};

export const MyTextField = ({ columnName, type }) => {
  const {
    error,
    setCellValue,
    currentRow,
    touched,
    setCellTouched,
  } = useContext(RowContext);

  return (
    <TextField
      type={type}
      value={currentRow?.[columnName]}
      size="small"
      variant="outlined"
      onChange={(e) => setCellValue({ [columnName]: e.target.value })}
      helperText={touched?.[columnName] && error?.[columnName]}
      error={Boolean(touched?.[columnName]) && Boolean(error?.[columnName])}
      onBlur={() => setCellTouched({ [columnName]: true })}
      fullWidth
    />
  );
};
