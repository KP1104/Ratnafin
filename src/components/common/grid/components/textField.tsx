import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useContext } from "react";
import { RowContext } from "./rowContext";
import { DefaultCellRender } from "./defaultCell";

export const EditableTextField = (props) => {
  const {
    column: { id: columnName },
    row: { id },
    currentEditRow,
    value,
  } = props;
  if (currentEditRow === id) {
    return <MyTextField key={columnName} columnName={columnName} />;
  } else {
    return <DefaultCellRender {...props} />;
  }
};

export const MyTextField = ({ columnName }) => {
  const { error, setCellValue, currentRow } = useContext(RowContext);
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      type="text"
      value={currentRow?.[columnName]}
      size="small"
      variant="outlined"
      onChange={(e) => setCellValue({ [columnName]: e.target.value })}
      helperText={touched && error?.[columnName]}
      error={touched && Boolean(error?.[columnName])}
      onBlur={() => setTouched(true)}
    />
  );
};
